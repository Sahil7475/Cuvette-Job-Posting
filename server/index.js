require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jobRoutes = require('./routes/job');
const companyRoutes = require('./routes/company'); // Import company routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api/job', jobRoutes);
app.use('/api/company', companyRoutes); // Use company routes

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
