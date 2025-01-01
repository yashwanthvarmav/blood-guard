const models = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../helpers/logger');
const { sendAdminNotificationEmail, sendOrganizationActivatedEmail, sendOrganizationPendingEmail, sendOrganizationNewPinEmail, sendNewOrganizationRegisterEmail } = require('../helpers/mailservice'); // Email helper
const crypto = require('crypto');

const ADMIN_EMAIL = 'bldgrddmn@gmail.com';

async function registerOrganizationController(data) {
    try {
        // Check if organization_code, organization_license_number, or organization_email already exists
        const organizationExists = await models.Organization.findOne({
            where: {
                [models.Sequelize.Op.or]: [
                    { organization_code: data.organization_code },
                    { organization_license_number: data.organization_license_number },
                    { organization_email: data.organization_email }
                ]
            }
        });

        if (organizationExists) {
            const errorField = organizationExists.organization_code === data.organization_code
                ? 'Organization Code'
                : organizationExists.organization_license_number === data.organization_license_number
                ? 'Organization License Number'
                : 'Organization Email';

            throw new Error(`${errorField} is already registered`);
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Generate a 6-digit PIN
        const organizationPin = crypto.randomInt(100000, 999999);

        // Create the organization in the database
        const newOrganization = await models.Organization.create({
            organization_code: data.organization_code,
            organization_license_number: data.organization_license_number,
            organization_name: data.organization_name,
            organization_branch_name: data.organization_branch_name,
            organization_date_of_establishment: data.organization_date_of_establishment,
            organization_primary_phone_number: data.organization_primary_phone_number,
            organization_secondary_phone_number: data.organization_secondary_phone_number,
            organization_email: data.organization_email,
            organization_address_line_one: data.organization_address_line_one,
            organization_address_line_two: data.organization_address_line_two,
            organization_city: data.organization_city,
            organization_state: data.organization_state,
            organization_country: data.organization_country,
            organization_zip_code: data.organization_zip_code,
            organization_pin: organizationPin,
            password: hashedPassword,
            role: data.role,
            organization_type: data.organization_type,
            organization_account_status: data.organization_account_status,
            organization_account_remarks: data.organization_account_remarks,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null
        });

        // Send email notification to admin
        await sendAdminNotificationEmail(ADMIN_EMAIL, newOrganization);

        await sendNewOrganizationRegisterEmail(data.organization_email, newOrganization);

        logger.info('Organization registered successfully');
        return { message: 'Organization registered successfully', organization: { email: newOrganization.organization_email } };
    } catch (error) {
        logger.error(error.message);
        throw error;
    }
}

async function organizationLoginController(email, password, pin, role) {
    try {
        // Step 1: Find the organization by email
        const organization = await models.Organization.findOne({ where: { organization_email: email, deleted_at: null } });
        if (!organization) {
            throw new Error('Organization with this email does not exist');
        }

        // Step 2: Validate the password
        const isPasswordValid = await bcrypt.compare(password, organization.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        // Step 3: Validate the PIN
        if (parseInt(organization.organization_pin) !== parseInt(pin)) {
            throw new Error('Invalid PIN');
        }

        // Step 4: Validate the role
        if (role !== 'ORGANIZATION') {
            throw new Error('Invalid role');
        }

        // Step 5: Generate JWT token
        const token = jwt.sign(
            { organizationId: organization.id, email: organization.organization_email, role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Step 6: Return response object
        return {
            message: 'Login successful',
            token,
            organization: {
                id: organization.id,
                email: organization.organization_email,
                role
            }
        };
    } catch (error) {
        console.error('Error in organizationLoginController:', error.message);
        throw error; // Propagate the error back to the route
    }
}

async function getOrganizationsController(req, res) {
    try {
        const { id, organization_account_status, name, city, zip, state } = req.query;

        // If an `id` is provided, fetch the organization by ID
        if (id) {
            const organization = await models.Organization.findByPk(id);
            if (!organization) {
                return res.status(404).json({ error: 'Organization not found' });
            }
            return res.status(200).json(organization);
        }

        // Build whereCondition based on query parameters for searching
        const whereCondition = {};
        if (organization_account_status) {
            whereCondition.organization_account_status = organization_account_status;
        }
        if (name) {
            whereCondition.organization_name = { [Op.iLike]: `%${name}%` };
        }
        if (city) {
            whereCondition.organization_city = { [Op.iLike]: `%${city}%` };
        }
        if (zip) {
            whereCondition.organization_zip_code = zip;
        }
        if (state) {
            whereCondition.organization_state = { [Op.iLike]: `%${state}%` };
        }

        // Fetch organizations with the constructed whereCondition
        const organizations = await models.Organization.findAndCountAll({
            where: whereCondition
        });

        res.status(200).json({
            total: organizations.count,
            organizations: organizations.rows
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateOrganizationStatusController(req, res) {
    try {
        const { id } = req.params;
        const { organization_account_status, organization_account_remarks } = req.body;

        const organization = await models.Organization.findByPk(id);
        if (!organization) {
            return res.status(404).json({ error: 'Organization not found' });
        }

        // Update status and remarks
        organization.organization_account_status = organization_account_status;
        organization.organization_account_remarks = organization_account_remarks;
        await organization.save();

        // Send email notifications based on the status
        if (organization_account_status === 'ACTIVE') {
            await sendOrganizationActivatedEmail(organization.organization_email, organization.organization_pin);
        } else if (organization_account_status === 'PENDING') {
            await sendOrganizationPendingEmail(organization.organization_email, organization_account_status, organization_account_remarks);
        }

        res.status(200).json({ message: 'Organization status updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function recoverOrganizationPasswordController(email, organization_pin, new_password, role) {
    try {
        // Validate role
        if (role !== 'ORGANIZATION') {
            throw new Error('Invalid role');
        }

        // Step 1: Find the organization by email
        const organization = await models.Organization.findOne({ where: { organization_email: email, deleted_at: null } });
        if (!organization) {
            throw new Error('Organization with this email does not exist');
        }

        // Step 2: Validate PIN
        if (parseInt(organization.organization_pin) !== parseInt(organization_pin)) {
            throw new Error('Invalid PIN');
        }

        // Step 3: Encrypt the new password
        const hashedPassword = await bcrypt.hash(new_password, 10);

        // Step 4: Update the password
        await organization.update({ password: hashedPassword, updated_at: new Date() });

        return { message: 'Password updated successfully' };
    } catch (error) {
        console.error('Error in recoverOrganizationPasswordController:', error.message);
        throw error;
    }
}

async function recoverOrganizationPinController(email, password, role) {
    try {
        // Validate role
        if (role !== 'ORGANIZATION') {
            throw new Error('Invalid role');
        }

        // Step 1: Find the organization by email
        const organization = await models.Organization.findOne({ where: { organization_email: email, deleted_at: null } });
        if (!organization) {
            throw new Error('Organization with this email does not exist');
        }

        // Step 2: Validate password
        const isPasswordValid = await bcrypt.compare(password, organization.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        // Step 3: Generate a new PIN
        const newPin = crypto.randomInt(100000, 999999);

        // Step 4: Update the PIN
        await organization.update({ organization_pin: newPin, updated_at: new Date() });

        // Step 5: Send email with the new PIN
        await sendOrganizationNewPinEmail(organization.organization_email, newPin);

        return { message: 'PIN updated and sent to the registered email' };
    } catch (error) {
        console.error('Error in recoverOrganizationPinController:', error.message);
        throw error;
    }
}

async function updateOrganizationProfileController(organizationId, updates) {
    try {
        // Step 1: Find the organization by ID
        const organization = await models.Organization.findByPk(organizationId);
        if (!organization || organization.deleted_at) {
            throw new Error('Organization not found');
        }

        // Step 2: Restricted fields
        const restrictedFields = [
            'organization_email', 'organization_pin', 'role', 'organization_account_status',
            'organization_license_number', 'organization_code'
        ];
        restrictedFields.forEach(field => {
            if (updates[field]) {
                throw new Error(`Field "${field}" cannot be updated`);
            }
        });

        // Step 3: Encrypt password if updating
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        // Step 4: Update the organization details
        await organization.update({ ...updates, updated_at: new Date() });

        return { message: 'Profile updated successfully' };
    } catch (error) {
        console.error('Error in updateOrganizationProfileController:', error.message);
        throw error;
    }
}

module.exports = {
    registerOrganizationController,
    organizationLoginController,
    getOrganizationsController,
    updateOrganizationStatusController,
    recoverOrganizationPasswordController,
    recoverOrganizationPinController,
    updateOrganizationProfileController
};
