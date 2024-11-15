const express = require('express');
const router = express.Router();
const signInService = require('../services/signinService'); // Import the sign-in service

// POST route for sign-in
router.post('/signin', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Call the sign-in service with the provided credentials
    const credentials = await signInService(username, password);

    // If successful, send the credentials as response
    res.json(credentials);
  } catch (error) {
    // Return the appropriate error message based on the error type
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
