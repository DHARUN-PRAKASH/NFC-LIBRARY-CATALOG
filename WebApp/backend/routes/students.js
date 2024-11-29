const express = require('express');
const router = express.Router();
const Student = require('../models/Student'); // Import Student model
const { updateFinesManually } = require('../controllers/fineController');

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching students', error: err.message });
  }
});

// Route to manually update fines
router.post('/update-fines', updateFinesManually);  

module.exports = router;
