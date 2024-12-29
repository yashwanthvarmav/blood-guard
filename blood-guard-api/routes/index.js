const express = require('express');
const router = express.Router();
const { registerUserRoute, loginUserRoute, recoverPasswordRoute, recoverPinRoute, updateUserProfileRoute } = require('./user');
const { registerOrganizationRoute, organizationLoginRoute, recoverOrganizationPasswordRoute, recoverOrganizationPinRoute, updateOrganizationProfileRoute } = require('./organization');
const { getOrganizationsController, updateOrganizationStatusController } = require('../controllers/organization');
const { getQuestionsController } = require('../controllers/question');
const { processEligibilityController } = require('../controllers/eligibility');
const donationCenterRoutes = require('./donationcenters');
const donationCampRoutes = require('./donationcamps');
const donorRoutes = require('./donors');
const donationRoutes = require('./donations');
const { adminLoginRoute } = require('./admin');
const { createContact, getContacts, updateContact } = require('../controllers/contact');
const { createSupport, listSupport, updateSupport } = require('../controllers/support');
const { validateToken } = require('../middlewares/auth');
const corporateRoutes = require('./corporate');
const { getUserList } = require ('../controllers/user');

// User routes
router.post('/register-user', registerUserRoute);
router.post('/login-user', loginUserRoute);
router.put('/recover-password-user', recoverPasswordRoute);
router.put('/recover-pin-user', recoverPinRoute);
router.put('/update-profile-user', validateToken, updateUserProfileRoute);
router.get('/users/list', getUserList);

// Organization routes
router.post('/register-organization', registerOrganizationRoute);
router.post('/login-organization', organizationLoginRoute);
router.get('/organizations', getOrganizationsController);
router.put('/organization/:id', validateToken, updateOrganizationStatusController);
router.put('/recover-password-organization', recoverOrganizationPasswordRoute);
router.put('/recover-pin-organization', recoverOrganizationPinRoute);
router.put('/update-profile-organization', validateToken, updateOrganizationProfileRoute);

// Question routes
router.get('/questions', getQuestionsController);

// Eligibility routes
router.post('/eligibility', validateToken, processEligibilityController);

// Donation Center routes
router.use('/donationcenters', donationCenterRoutes);

// Donation Camp routes
router.use('/donationcamps', donationCampRoutes);

// Donor routes
router.use('/donors', donorRoutes);

// Donation routes
router.use('/donations', donationRoutes);

// Corporate routes
router.use('/corporate', corporateRoutes);

// Admin routes
router.post('/admin-login', adminLoginRoute);

// Contact routes
router.post('/contact/create', createContact);
router.get('/contact/list', getContacts);
router.put('/contact/update/:contact_id', validateToken, updateContact);

// Support routes
router.post('/support/create', createSupport);
router.get('/support/list', listSupport);
router.put('/support/update/:id', validateToken, updateSupport);

module.exports = router;
