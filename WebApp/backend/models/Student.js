const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  department: String,
  roll_no: { type: String, unique: true },
  mobile: String,
  attendance: [{ type: Date }], // Stores attendance dates
  no_of_days: { type: Number, default: 0 }, // Total attendance days

  borrowed_books: [
    {
      title: { type: String}, // Reference to the book
      borrowed_date: { type: Date }, // Date when the book was borrowed
      due_date: { type: Date }, // Due date for returning the book
      fine: { type: Number, default: 0 }, // Fine for late return of this book
    },
  ],

  total_fine: { type: Number, default: 0 }, // Total fine accumulated by the student
});

module.exports = mongoose.model('Student', studentSchema);
