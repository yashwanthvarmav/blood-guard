const express = require('express');
const { createContact, getContacts, updateContact } = require('../controllers/contact');
const router = express.Router();

// Create a new contact
router.post('/', createContact);

// Get a list of contacts
router.get('/', getContacts);

// Update a contact status and remarks
router.put('/:contact_id', updateContact);

module.exports = router;
