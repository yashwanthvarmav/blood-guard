const Joi = require('joi');
const { registerOrganizationController, organizationLoginController, recoverOrganizationPasswordController, recoverOrganizationPinController, updateOrganizationProfileController  } = require('../controllers/organization');

const organizationSchema = Joi.object({
    organization_code: Joi.string().required(),
    organization_license_number: Joi.string().required(),
    organization_name: Joi.string().required(),
    organization_branch_name: Joi.string().required(),
    organization_date_of_establishment: Joi.date().required(),
    organization_primary_phone_number: Joi.string().required(),
    organization_secondary_phone_number: Joi.string().optional(),
    organization_email: Joi.string().email().required(),
    organization_address_line_one: Joi.string().required(),
    organization_address_line_two: Joi.string().optional(),
    organization_city: Joi.string().required(),
    organization_state: Joi.string().required(),
    organization_country: Joi.string().required(),
    organization_zip_code: Joi.string().required(),
    organization_pin: Joi.number().integer().optional(),
    password: Joi.string().min(8).required(),
    role: Joi.string().valid('ORGANIZATION').required(),
    organization_type:Joi.string().required(),
    organization_account_status: Joi.string().required(),
    organization_account_remarks: Joi.string().optional()
});

const organizationLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    pin: Joi.number().integer().required(),
    role: Joi.string().valid('ORGANIZATION').required()
});

const recoverOrganizationPasswordSchema = Joi.object({
    email: Joi.string().email().required(),
    new_password: Joi.string().required(),
    organization_pin: Joi.number().integer().required(),
    role: Joi.string().valid('ORGANIZATION').required()
});

const recoverOrganizationPinSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid('ORGANIZATION').required()
});

async function registerOrganizationRoute(req, res) {
    try {
        // Validate request data
        const { error } = organizationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        // Register the organization
        const result = await registerOrganizationController(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

async function organizationLoginRoute(req, res) {
    try {
        const { error } = organizationLoginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { email, password, pin, role } = req.body;

        const result = await organizationLoginController(email, password, pin, role);

        res.status(200).json(result);
    } catch (error) {
        console.error('Error in organizationLoginRoute:', error.message);
        res.status(500).json({ error: error.message });
    }
};

async function recoverOrganizationPasswordRoute(req, res) {
    try {

        const { error } = recoverOrganizationPasswordSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { email, organization_pin, new_password, role } = req.body;

        const result = await recoverOrganizationPasswordController(email, organization_pin, new_password, role);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Recover PIN
async function recoverOrganizationPinRoute(req, res) {
    
    try {
        const { error } = recoverOrganizationPinSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { email, password, role } = req.body;

        const result = await recoverOrganizationPinController(email, password, role);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update Organization Profile
async function updateOrganizationProfileRoute(req, res) {
    try {
        const { organizationId, ...updates } = req.body;

        const result = await updateOrganizationProfileController(organizationId, updates);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = exports = {
    registerOrganizationRoute,
    organizationLoginRoute,
    recoverOrganizationPasswordRoute,
    recoverOrganizationPinRoute,
    updateOrganizationProfileRoute
};

