const express = require('express');
const router = express.Router();
const {
  addDonationCenter,
  listDonationCenters,
  updateDonationCenter,
  removeDonationCenter
} = require('../controllers/donationcenters');
const { validateToken } = require('../middlewares/auth');
const Joi = require('joi');

// Joi validation for adding and updating a donation center
const donationCenterSchema = Joi.object({
  name: Joi.string().required(),
  status: Joi.string().valid('ACTIVE', 'INACTIVE').required(),
  address_line_one: Joi.string().required(),
  address_line_two: Joi.string().optional(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
  zipcode: Joi.string().required(),
  phone_number: Joi.string().required(),
  email: Joi.string().email().required(),
  type: Joi.string().valid('BLOOD DONATION CENTER', 'BLOOD BANK').required(),
  organization_type: Joi.string().valid('Government', 'Private', 'NGO').required(),
  open_timings: Joi.string().optional(),
  holiday_timings: Joi.string().optional(),
  open_weekly_days: Joi.string().optional(),
  organization_id: Joi.number().required()
});

// Add Blood Donation Center
router.post('/add', async (req, res, next) => {
  try {
    const { error } = donationCenterSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    await addDonationCenter(req, res);
  } catch (err) {
    next(err);
  }
});

// List Blood Donation Centers
router.get('/list', async (req, res, next) => {
  try {
    await listDonationCenters(req, res);
  } catch (err) {
    next(err);
  }
});

// Update Blood Donation Center
router.put('/update/:id', async (req, res, next) => {
  try {
    await updateDonationCenter(req, res);
  } catch (err) {
    next(err);
  }
});

// Remove Blood Donation Center
router.delete('/remove/:id', async (req, res, next) => {
  try {
    await removeDonationCenter(req, res);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
