const express = require('express');
const router = express.Router();
const { registerUserRoute, loginUserRoute } = require('./user');
const { registerOrganizationRoute, organizationLoginRoute } = require('./organization');
const { getOrganizationsController, updateOrganizationStatusController } = require('../controllers/organization');
const { getQuestionsController } = require('../controllers/question');
const { processEligibilityController } = require('../controllers/eligibility');
const donationCenterRoutes = require('./donationcenters');
const donationCampRoutes = require('./donationcamps');
const donorRoutes = require('./donors');
const donationRoutes = require('./donations');
const adminRoutes = require('./admin');
const contactRoutes = require('./contact');
const supportRoutes = require('./support');



// User routes
router.post('/register-user', registerUserRoute);
router.post('/login-user', loginUserRoute);

// Organization routes
router.post('/register-organization', registerOrganizationRoute);
router.post('/login-organization', organizationLoginRoute)
router.get('/organizations', getOrganizationsController);
router.put('/organization/:id', updateOrganizationStatusController);

// Question routes
router.use('/questions', getQuestionsController);

// Eligibility routes
router.use('/eligibility', processEligibilityController);

// Donation Center routes
router.use('/donationcenters', donationCenterRoutes);

// Donation Camp routes
router.use('/donationcamps', donationCampRoutes);

// Donor routes
router.use('/donors', donorRoutes);

// Donation routes
router.use('/donations', donationRoutes);

// Admin routes
router.use('/admin', adminRoutes);

// Contact routes
router.use('/contact', contactRoutes);

// Support routes
router.use('/support', supportRoutes);

module.exports = router;
