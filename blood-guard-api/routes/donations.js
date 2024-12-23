const express = require('express');
const router = express.Router();
const {
  getDonations,
  addDonation,
  updateDonation,
  deleteDonation,
  getBloodStock, 
  getDonationHistory
} = require('../controllers/donations');
const { validateToken } = require('../middlewares/auth');

// Get donations with filters
router.get('/list', getDonations);

// Add a new donation record
router.post('/add', validateToken, addDonation);

// Update a donation record
router.put('/update/:id', validateToken, updateDonation);

// Soft delete a donation record
router.delete('/remove/:id', validateToken, deleteDonation);

router.get('/blood-stock', getBloodStock);

router.get('/history/:user_id', validateToken, getDonationHistory);

module.exports = router;
