const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  department: String,
  roll_no: { type: String, unique: true },
  mobile: String,
  attendance: [{ type: Date }],
  no_of_days: { type: Number, default: 0 },
  borrowed_books: [
    {
      book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
      due_date: Date,
      fine: { type: Number, default: 0 },
    },
  ],
});

module.exports = mongoose.model('Student', studentSchema);
