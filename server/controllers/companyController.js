const Company = require('../models/company');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Email Setup
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,   
    },
});

// Register a new company
const registerCompany = async (req, res) => {
    const { companyName, name, companyEmail, password, companyMobile, employeeSize } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP

        const company = await Company.findOne({ companyEmail: companyEmail });

        if (company) {
            return res.status(201).json({ message: 'Company Already registered.' });
        }


        const newCompany = new Company({
            companyName,
            name,
            companyEmail,
            password: hashedPassword,
            companyMobile,
            employeeSize,
            isVerified: false, // Initially set to false
            emailOTP: otp, // Store the OTP in the company document
            otpExpires: Date.now() + 3600000 // Set expiration for 1 hour
        });

        console.log("nem=w",newCompany)

        const savedCompany = await newCompany.save();

        // Send verification email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: companyEmail,
            subject: 'Verify your email with OTP',
            text: `Your OTP is: ${otp}. It is valid for 1 hour.`
        });

        res.status(201).json({ message: 'Registration successful. Please verify your email with the OTP sent.' });
  } catch (error) {
        console.error(error);  // Log the error for debugging
        res.status(400).json({ error: 'Error registering company.' });
    }
};

// Verify company email
const verifyCompanyEmail = async (req, res) => {
    const { companyEmail,otp } = req.body; // Extract the token and OTP from the request body

    try {
        
        
        const company = await Company.findOne({ companyEmail: companyEmail });

        if (!company) {
            return res.status(404).json({ error: 'Company not found.' });
        }

        // Check if the company is already verified
        if (company.isVerified) {
            return res.status(400).json({ message: 'Email already verified.' });
        }

        // Check if the OTP matches and is still valid
        if (company.emailOTP === otp ) {
            // Mark the company as verified
            company.isVerified = true;
            company.emailOTP = null; // Clear OTP after verification
            company.otpExpires = null; // Clear expiration
            await company.save();
            // Respond with a success message
            res.status(200).json({ message: 'Email verified successfully!' });
        } else {
            return res.status(400).json({ error: 'Invalid or expired OTP.' });
        }
    } catch (error) {
        console.error(error);  // Log the error for debugging
        res.status(400).json({ error: 'Invalid or expired token.' });
    }
};

// Login a company
const loginCompany = async (req, res) => {
    const { companyEmail, password } = req.body;

    try {
        const company = await Company.findOne({ companyEmail });

        if (!company || !company.isVerified) {
            return res.status(404).json({ error: 'Company not found or not verified.' });
        }

        const isMatch = await bcrypt.compare(password, company.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);  // Log the error for debugging
        res.status(500).json({ error: 'Server error.' });
    }
};

module.exports = {
    registerCompany,
    verifyCompanyEmail,
    loginCompany,
};
