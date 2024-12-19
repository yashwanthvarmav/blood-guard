const express = require('express');
const router = express.Router();
const { createSupport, listSupport, updateSupport } = require('../controllers/support');

// Routes
router.post('/create', createSupport);
router.get('/list', listSupport);
router.put('/update/:id', updateSupport);

module.exports = router;
