// routes/auth.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/user');

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { name, phoneNumber, password } = req.body;

    // Check if user already exists
    let userFind = await user.findOne({ phoneNumber });
    if (userFind) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    userFind = new user({
      name,
      phoneNumber,
      password: hashedPassword
    });

    // Save user to database
    await userFind.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    // Check if user exists
    let userLogin = await user.findOne({ phoneNumber });
    if (!userLogin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, userLogin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create and send JWT token
    console.log("userLogin: " + userLogin.id);
    const payload = {
        id: userLogin.id
    };

    jwt.sign(payload, '5G#j2r@Fp$Vs7qN!', { expiresIn: '7656h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
