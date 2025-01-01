const express = require('express');
const router = express.Router();
const { getEligibleDonorsController, requestBloodDonationController } = require('../controllers/donors');
const Joi = require('joi');
const { validateToken } = require('../middlewares/auth');

// Joi validation schema for the request body
const bloodRequestSchema = Joi.object({
    user_id: Joi.number().integer().required(),
    organization_id: Joi.number().integer().required()
});

// Joi validation schema for query parameters
const donorQuerySchema = Joi.object({
  first_name: Joi.string().optional(),
  last_name: Joi.string().optional(),
  blood_group: Joi.string().optional(),
  email: Joi.string().email().optional(),
  city: Joi.string().optional(),
  state: Joi.string().optional(),
  country: Joi.string().optional(),
  zipcode: Joi.string().optional(),
});

// Fetch Eligible Donors Route
router.get('/list', async (req, res, next) => {
  try {
    const { error } = donorQuerySchema.validate(req.query);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    await getEligibleDonorsController(req, res);
  } catch (err) {
    next(err);
  }
});

// Request Blood Donation Route
router.post('/request-blood', validateToken, async (req, res, next) => {
    try {
      const { error } = bloodRequestSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      await requestBloodDonationController(req, res);
    } catch (err) {
      next(err);
    }
});

module.exports = router;