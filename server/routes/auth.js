const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();
const passport = require('passport');

// Register Route
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword, membershipType } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match!' });
    }
    if (!email || !fullName || !password || !confirmPassword || !membershipType) {
      return res.status(400).json({ message: 'All fields are required!' });
    }
    // No hashing of password here
    const newUser = new User({ fullName, email, password, membershipType });
    await newUser.save();
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Received login request:", { email, password });

   
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (password !== user.password) {
      console.log("Password mismatch");
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    
    const token = user.generateAuthToken();
    
    res.status(200).json({
      message: 'Login successful!',
      token,
      membershipType: user.membershipType
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'An error occurred. Please try again later.' });
  }
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.redirect("/app");
  }
);

router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
  })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.redirect("/app");
  }
);

module.exports = router;
