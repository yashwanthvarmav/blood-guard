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

// API-1: Get donations with filters
router.get('/list', getDonations);

// API-2: Add a new donation record
router.post('/add', addDonation);

// API-3: Update a donation record
router.put('/update/:id', updateDonation);

// API-4: Soft delete a donation record
router.delete('/remove/:id', deleteDonation);


router.get('/blood-stock', getBloodStock);


router.get('/history/:user_id', getDonationHistory);

module.exports = router;
