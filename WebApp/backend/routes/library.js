const express = require('express');
const Student = require('../models/Student'); // Student model
const Book = require('../models/Book'); // Book model

const router = express.Router();

// In-memory session store
let librarySession = {
  action: null, // Either "borrow" or "return"
  student: null, // Student details
  books: [], // Array to store books in the current session
};

// Endpoint to select action (borrow or return)
router.post('/select-action', (req, res) => {
  const { action } = req.body;
  if (!['borrow', 'return'].includes(action)) {
    return res.status(400).send({ message: 'Invalid action. Choose either "borrow" or "return".' });
  }

  // Reset session
  librarySession = { action, student: null, books: [] };
  console.log(`Action selected: ${action}`);
  res.status(200).send({ message: `Action set to ${action}` });
});

// Endpoint to scan student or book NFC data (both in same URL)
router.post('/', async (req, res) => {
  const { nfc_data } = req.body; // Incoming NFC data

  if (!librarySession.action) {
    return res.status(400).send({ message: 'No action selected. Please select an action first.' });
  }

  // Check if the NFC data is for student or book
  if (nfc_data.includes("Student Details")) {
    // Handle student scan
    if (librarySession.student) {
      return res.status(400).send({ message: 'Student session already active. Scan books or stop the session.' });
    }

    const studentData = parseStudentData(nfc_data);

    if (!studentData) {
      return res.status(400).send({ message: 'Invalid NFC student data.' });
    }

    try {
      const student = await Student.findOne({ roll_no: studentData.roll_no });
      if (!student) {
        return res.status(404).send({ message: 'Student not found.' });
      }

      librarySession.student = student;
      console.log('Student session started:', studentData);
      return res.status(200).send({ message: 'Student session started.', student });
    } catch (error) {
      return res.status(500).send({ message: 'Error starting student session.', error: error.message });
    }
  } else if (nfc_data.includes("Book Details")) {
    // Handle book scan
    if (!librarySession.student) {
      return res.status(400).send({ message: 'No student session started. Please scan a student ID first.' });
    }

    const bookData = parseBookData(nfc_data);

    if (!bookData) {
      return res.status(400).send({ message: 'Invalid NFC book data.' });
    }

    try {
      const book = await Book.findOne({ title: bookData.title, author: bookData.author });
      if (!book) {
        return res.status(404).send({ message: 'Book not found.' });
      }

      if (librarySession.action === 'borrow' && book.available_pieces <= 0) {
        return res.status(400).send({ message: 'Book not available for borrowing.' });
      }

      if (librarySession.action === 'return' && !book.borrowed_by.some(borrower => borrower.roll_no === librarySession.student.roll_no)) {
        return res.status(400).send({ message: 'This book was not borrowed by the current student.' });
      }

      // Add the book to the session
      librarySession.books.push(book);
      console.log('Book added to session:', bookData);
      return res.status(200).send({ message: 'Book added to session.', book });
    } catch (error) {
      return res.status(500).send({ message: 'Error adding book to session.', error: error.message });
    }
  } else {
    return res.status(400).send({ message: 'Invalid NFC data. Unable to parse student or book information.' });
  }
});

// Endpoint to stop the session
router.post('/stop-session', async (req, res) => {
  if (!librarySession.student) {
    return res.status(400).send({ message: 'No session to stop. Start a session first.' });
  }

  try {
    const { action, student, books } = librarySession;

    if (action === 'borrow') {
      for (const book of books) {
        book.available_pieces -= 1; // Decrease available pieces for borrowed books

        book.borrowed_by.push({
          roll_no: student.roll_no,
          due_date: new Date(new Date().setDate(new Date().getDate() + 14)), // 2-week loan period
        });

        student.borrowed_books.push({
          book_id: book._id, // Reference to book
          borrowed_date: new Date(),
          due_date: new Date(new Date().setDate(new Date().getDate() + 14)),
        });

        await book.save();
      }
    } else if (action === 'return') {
      for (const book of books) {
        // Ensure borrowed_by exists and filter the student out
        if (book && book.borrowed_by) {
          book.borrowed_by = book.borrowed_by.filter(borrower => borrower.roll_no !== student.roll_no);
        }

        book.available_pieces += 1; // Increase available pieces for returned books

        if (student && student.borrowed_books) {
          student.borrowed_books = student.borrowed_books.filter(
            (b) => b.book_id && b.book_id.toString() !== book._id.toString()
          );
        }

        await book.save(); // Save the updated book and student data
      }
    }

    // Save student after updating borrowed_books
    await student.save();

    // Reset session after completing the action
    librarySession = { action: null, student: null, books: [] };

    console.log('Session completed successfully:', librarySession);
    res.status(200).send({ message: 'Session completed successfully.', student, books });
  } catch (error) {
    console.error('Error completing session:', error);
    res.status(500).send({ message: 'Error completing session.', error: error.message });
  }
});


// Utility to parse NFC data for students
function parseStudentData(nfcData) {
  const match = /Student Details Name:\s*(.+?)\s*Department:\s*(.+?)\s*Roll-no:\s*(\w+)\s*Mobile:\s*(\d+)/.exec(nfcData);
  return match
    ? {
        name: match[1].trim(),
        department: match[2].trim(),
        roll_no: match[3].trim(),
        mobile: match[4].trim(),
      }
    : null;
}

// Utility to parse NFC data for books
function parseBookData(nfcData) {
  const match = /Book Details title:\s*(.+?)\s*author:\s*(.+?)\s*genre:\s*(.+)/.exec(nfcData);
  return match
    ? {
        title: match[1].trim(),
        author: match[2].trim(),
        genre: match[3].trim(),
      }
    : null;
}

module.exports = router;
