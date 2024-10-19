const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    name: { type: String, required: true },
    companyEmail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    companyMobile: { type: String, required: true },
    employeeSize : {type:Number,required:true},
    isVerified: { type: Boolean, default: false },
    emailOTP: { type: String },
    mobileOTP: { type: String },
    otpExpires: { type: Date },
});

module.exports = mongoose.model('Company', CompanySchema);
