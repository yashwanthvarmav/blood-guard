const express = require('express');
const router = express.Router();
const { registerOrganizationController, organizationLoginController  } = require('../controllers/organization');
const Joi = require('joi');

// Define the Joi validation schema
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
    role: Joi.string(),
    organization_type:Joi.string().required(),
    organization_account_status: Joi.string().required(),
    organization_account_remarks: Joi.string().optional()
});

const organizationLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    organization_pin: Joi.number().integer().required()
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

        // Extract request body
        const { email, password, organization_pin } = req.body;

        // Call the controller and pass the extracted data
        const result = await organizationLoginController(email, password, organization_pin);

        // Send success response
        res.status(200).json(result);
    } catch (error) {
        console.error('Error in organizationLoginRoute:', error.message);
        res.status(500).json({ error: error.message });
    }
}



module.exports = exports = {
    registerOrganizationRoute,
    organizationLoginRoute
};

