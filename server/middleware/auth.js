const jwt = require('jsonwebtoken');
const company = require('../models/company');

const verifyToken = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log(req.header('Authorization'));
    console.log(token);

    if (!token) return res.status(401).json({ error: 'No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded",decoded);
        req.user = await company.findById(decoded.id);
        console.log(req.user);
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token.' });
    }
};

module.exports = verifyToken;
