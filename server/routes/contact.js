const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// Contact route
router.post("/", (req, res) => {
  const { name, email, phone, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL,        // Always use your Gmail here
    to: process.env.EMAIL,          // Receive the message yourself
    replyTo: email,                 // User's email for replying
    subject: `New Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({
        code: 500,
        message: "Failed to send email",
        error: error.toString(),
      });
    }
    res.status(200).json({ code: 200, message: "Message sent successfully" });
  });
});

module.exports = router;
