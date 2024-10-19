const express = require('express');
const { postJob } = require('../controllers/jobController');
const verifyToken = require('../middleware/auth'); // Assuming you have an authentication middleware
const router = express.Router();

// Post a Job
router.post('/post', verifyToken, postJob);

module.exports = router;
