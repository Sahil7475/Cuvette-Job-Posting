const express = require('express');
const { registerCompany, verifyCompanyEmail, loginCompany } = require('../controllers/companyController');
const router = express.Router();

// Register a Company
router.post('/register', registerCompany);

// Verify Company Email
router.get('/verify', verifyCompanyEmail);

// Login a Company
router.post('/login', loginCompany);

module.exports = router;
