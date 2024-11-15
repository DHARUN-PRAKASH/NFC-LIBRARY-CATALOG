const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  borrowed_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', default: null },
  borrowed_date: Date,
  due_date: Date,
});

module.exports = mongoose.model('Book', bookSchema);
