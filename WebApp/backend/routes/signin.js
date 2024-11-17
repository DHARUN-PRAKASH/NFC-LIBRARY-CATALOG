const express = require('express');
const router = express.Router();
const Account = require('../models/account'); // Import the account model

// Sign-In Logic (Service + Controller)
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Validate inputs
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Find the user in the database
    const user = await Account.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Respond with user details if authentication is successful
    res.status(200).json({
      username: user.username,
      password: user.password, // Optional: Avoid sending passwords in production
    });
  } catch (error) {
    // Handle unexpected errors
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

module.exports = router;
