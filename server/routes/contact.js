const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // use STARTTLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: '✅ Message sent successfully!' });
  } catch (error) {
    console.error('❌ Email send error:', error);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

module.exports = router;
