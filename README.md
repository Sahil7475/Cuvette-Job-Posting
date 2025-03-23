# Job Posting Platform API

## Description
This is a backend API for a job posting platform designed for companies. It handles company registration, login, job posting, and email notifications using Node.js and Express.

## Features
- Company registration with email verification (OTP-based) using Nodemailer
- Secure login using JWT
- Job posting functionality
- Automated email notifications for registered users when a company posts a job

## Technologies Used
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for authentication
- Nodemailer for email automation

## API Endpoints

### 1. Company Registration
**POST** `/api/company/register`
- Registers a new company and sends an OTP for email verification.
- **Body:**
  ```json
  {
    "companyName": "Tech Innovations Inc.", 
    "name": "John Doe",
    "companyEmail": "techinnovations@gmail.com",
    "password": "StrongPass@123",
    "companyMobile": "9876543210",
    "employeeSize": 50
  }
  ```

### 2. Company Login
**POST** `/api/company/login`
- Logs in a company using email and password.
- **Body:**
  ```json
  {
    "companyEmail": "techinnovations@gmail.com",
    "password": "StrongPass@123"
  }
  ```

### 3. Verify Company Email
**POST** `/api/company/verify`
- Verifies the company's email using the OTP sent.
- **Body:**
  ```json
  {
    "companyEmail": "techinnovations@gmail.com",
    "otp": "123456"
  }
  ```

### 4. Post a Job
**POST** `/api/job/post`
- Allows a verified company to post a job.
- **Body:**
  ```json
  {
    "title": "Software Engineer", 
    "description": "We are looking for a skilled software engineer to join our team.", 
    "experienceLevel": "Mid-level", 
    "endDate": "2024-12-31",
    "candidates": ["johndoe@gmail.com", "janedoe@gmail.com"] 
  }
  ```
- **Note:** Automatically sends an email notification to all users registered for job alerts with this company.

## Setup and Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Sahil7475/Cuvette-Job-Posting.git
    cd Cuvette-Job-Posting
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set environment variables:
    Create a `.env` file in the root directory and add:
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    BASE_URL=http://localhost:5000
    EMAIL_USER=your-email@example.com
    EMAIL_PASS=your-password
    ```

4. Run the server:
    ```bash
    npm start
    ```

## Future Enhancements
- User registration for job seekers
- More job filtering options
- Admin dashboard for managing companies and jobs
