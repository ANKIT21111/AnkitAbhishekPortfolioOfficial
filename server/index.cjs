require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Transporter for nodemailer (safe initialization)
let transporter = null;
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
}

// POST contact form submission
app.post('/api/contact', async (req, res) => {
    const { identifier, email, message } = req.body;
    if (!identifier || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'ankitabhishek1005@gmail.com',
        subject: `New Contact Form Submission from ${identifier}`,
        text: `Name: ${identifier}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
                <h2 style="color: #4f46e5; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${identifier}</p>
                <p><strong>Email:</strong> ${email}</p>
                <div style="background-color: #f9fafb; padding: 15px; border-radius: 5px; margin-top: 20px;">
                    <p><strong>Message:</strong></p>
                    <p style="white-space: pre-wrap;">${message}</p>
                </div>
                <hr style="margin-top: 30px; border: 0; border-top: 1px solid #eee;" />
                <p style="font-size: 12px; color: #6b7280; text-align: center;">Sent from Ankit Abhishek Portfolio</p>
            </div>
        `
    };

    if (!transporter) {
        console.error('Contact failed: Transporter not configured');
        return res.status(503).json({ error: 'Email service is offline. Please try again later.' });
    }

    // Non-blocking email sending for faster UI response
    transporter.sendMail(mailOptions)
        .then(() => console.log(`Contact email sent from ${email}`))
        .catch((error) => console.error('Error sending contact email:', error));

    res.json({ message: 'Email transmission initiated' });
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

module.exports = app;
