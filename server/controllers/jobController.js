const Job = require('../models/job');
const Company = require('../models/company');
const nodemailer = require('nodemailer');

// Email Setup
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,  // Your email
        pass: process.env.EMAIL_PASS,   // Your email password or app password
    },
});

// Post a Job
const postJob = async (req, res) => {
    const { title, description, experienceLevel, endDate, candidates } = req.body;

    const newJob = new Job({
        title,
        description,
        experienceLevel,
        endDate,
        company: req.user.id,  // Assuming req.user.id is the ID of the company posting the job
        candidates, // List of candidate emails or usernames
    });

    try {
        const savedJob = await newJob.save();
        
        // Fetch candidate emails from the Company collection
        const candidateEmails = await Company.find({ companyEmail: { $in: candidates } });

        // Extract email addresses
        const emails = candidateEmails.map(company => company.companyEmail);

        // Job details to include in the email
        const jobDetails = `
            Job Title: ${title}
            Description: ${description}
            Experience Level: ${experienceLevel}
            End Date: ${endDate}
        `;

        // Send email notifications to candidates
        await Promise.all(emails.map(email => {
            return transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'New Job Posting',
                text: `You have been added to the following job posting:\n\n${jobDetails}`
            });
        }));

        res.status(201).json(savedJob);
    } catch (error) {
        console.error('Error posting job or sending emails:', error);
        res.status(400).json({ error: 'Error posting job or sending emails.' });
    }
};

module.exports = {
    postJob,
};
