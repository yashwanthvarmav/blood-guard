const Joi = require('joi');
const { registerUserController, userLoginController, recoverPasswordController, recoverPinController, updateUserProfileController} = require('../controllers/user');

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
    role: Joi.string().valid('DONOR').required(),
    password: Joi.string().min(8).required(),
    user_account_status: Joi.string().required(),
    user_notifications: Joi.string().required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    pin: Joi.number().integer().required(),
    role: Joi.string().valid('DONOR').required()
});

const recoverPasswordSchema = Joi.object({
    email: Joi.string().email().required(),
    new_password: Joi.string().required(),
    user_pin: Joi.number().integer().required(),
    role: Joi.string().valid('DONOR').required()
});

const recoverPinSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid('DONOR').required()
});

async function registerUserRoute(req, res) {
    try {
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const result = await registerUserController(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

async function loginUserRoute(req, res) {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { email, password, pin, role } = req.body;

        const result = await userLoginController(email, password, pin, role);

        res.status(200).json(result);
    } catch (error) {
        console.error('Error in loginUserRoute:', error.message);
        res.status(500).json({ error: error.message });
    }
}

async function recoverPasswordRoute(req, res) {
    
    try {
        const { error } = recoverPasswordSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { email, user_pin, new_password, role } = req.body;

        const result = await recoverPasswordController(email, user_pin, new_password, role);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function recoverPinRoute(req, res) {
    
    try {

        const { error } = recoverPinSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { email, password, role } = req.body;

        const result = await recoverPinController(email, password, role);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function updateUserProfileRoute(req, res) {
    try {
        const { userId, ...updates } = req.body;

        const result = await updateUserProfileController(userId, updates);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = exports = {
    registerUserRoute,
    loginUserRoute,
    recoverPasswordRoute,
    recoverPinRoute,
    updateUserProfileRoute
};
