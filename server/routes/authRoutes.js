const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const User = require('../models/User');

function handleError(res, statusCode, message) {
  return res.status(statusCode).json({ error: message });
}

// Register
router.post('/register', async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (!email || !password || !confirmPassword) {
    return handleError(res, 400, 'Please provide email, password, and confirm password.');
  }

  if (password !== confirmPassword) {
    return handleError(res, 400, 'Passwords do not match');
  }

  const passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|`~]).{8,}$/;
  if (!passwordStrengthRegex.test(password)) {
    return handleError(res, 400, 'Password must meet the strength requirements.');
  }

  if (!validator.isEmail(email)) {
    return handleError(res, 400, 'Invalid email format');
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return handleError(res, 400, 'User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully', success: true });
  } catch (error) {
    handleError(res, 500, 'Error registering user');
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).send('Email and password are required');

    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(404).send("Invalid credentials");

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '12hr' });

    res.status(200).send({ message: "Login successful", token });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
