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


// User routes
router.post('/register-user', registerUserRoute);
router.post('/login-user', loginUserRoute);

// Organization routes
router.post('/register-organization', registerOrganizationRoute);
router.post('/login-organization', organizationLoginRoute)
router.get('/organizations', getOrganizationsController);


//router.get('/organizations', getOrganizationsByStatusController); // API-1: Get organizations by status
//router.get('/organization/:id', getOrganizationByIdController);   // API-2: Get organization by ID
router.put('/organization/:id', updateOrganizationStatusController); // API-3: Update organization status and remarks

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


module.exports = router;
