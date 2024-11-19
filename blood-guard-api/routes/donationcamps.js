const express = require('express');
const router = express.Router();
const {
  addDonationCamp,
  listDonationCamps,
  updateDonationCamp,
  removeDonationCamp
} = require('../controllers/donationcamps');
const Joi = require('joi');

// Joi validation for adding and updating a donation camp
const donationCampSchema = Joi.object({
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
  camp_type: Joi.string().valid('Government', 'Private', 'NGO').required(),
  start_date: Joi.date().required(),
  end_date: Joi.date().required(),
  open_timings: Joi.string().optional(),
  collaboration_with: Joi.string().optional(),
  organization_id: Joi.number().required()
});

// Add Blood Donation Camp
router.post('/add', async (req, res, next) => {
  try {
    const { error } = donationCampSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    await addDonationCamp(req, res);
  } catch (err) {
    next(err);
  }
});

// List Blood Donation Camps
router.get('/list', async (req, res, next) => {
  try {
    await listDonationCamps(req, res);
  } catch (err) {
    next(err);
  }
});

// Update Blood Donation Camp
router.put('/update/:id', async (req, res, next) => {
  try {
    await updateDonationCamp(req, res);
  } catch (err) {
    next(err);
  }
});

// Remove Blood Donation Camp
router.delete('/remove/:id', async (req, res, next) => {
  try {
    await removeDonationCamp(req, res);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
