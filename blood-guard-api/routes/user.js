const express = require('express');
const router = express.Router();
const { registerUserController, userLoginController  } = require('../controllers/user');
const Joi = require('joi');

// Define the Joi validation schema
const registerSchema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    date_of_birth: Joi.date().required(),
    gender: Joi.string().required(),
    blood_group: Joi.string().required(),
    primary_phone_number: Joi.string().required(),
    secondary_phone_number: Joi.string().optional(),
    email: Joi.string().email().required(),
    home_address_line_one: Joi.string().required(),
    home_address_line_two: Joi.string().optional(),
    home_city: Joi.string().required(),
    home_state: Joi.string().required(),
    home_country: Joi.string().required(),
    home_zip_code: Joi.string().required(),
    work_address_line_one: Joi.string().optional(),
    work_address_line_two: Joi.string().optional(),
    work_city: Joi.string().optional(),
    work_state: Joi.string().optional(),
    work_country: Joi.string().required(),
    work_zip_code: Joi.string().optional(),
    user_pin: Joi.number().integer().optional(),
    role: Joi.string(),
    password: Joi.string().min(8).required(),
    user_account_status: Joi.string().required(),
    user_notifications: Joi.string().required()
});

// Define the Joi validation schema for user login
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    user_pin: Joi.number().integer().required()
});

async function registerUserRoute(req, res) {
    try {
        // Validate request data
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        // Register the user
        const result = await registerUserController(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// User Login Route
async function loginUserRoute(req, res) {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        // Extract request body data
        const { email, password, user_pin } = req.body;

        // Call the controller and pass the extracted data
        const result = await userLoginController(email, password, user_pin);

        // Send success response
        res.status(200).json(result);
    } catch (error) {
        console.error('Error in loginUserRoute:', error.message);
        res.status(500).json({ error: error.message });
    }
}

module.exports = exports = {
    registerUserRoute,
    loginUserRoute
};
