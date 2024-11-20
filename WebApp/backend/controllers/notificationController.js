const Student = require('../models/Student');
const calculateFine = require('../services/fineCalculator');
const sendSMS = require('../services/smsService');

async function sendNotifications() {
  const currentDate = new Date();

  const students = await Student.find({});
  for (const student of students) {
    for (const book of student.borrowed_books) {
      const { due_date, fine, title } = book;

      if (!due_date) continue;

      const timeDifference = (due_date - currentDate) / (24 * 60 * 60 * 1000);

      if (timeDifference <= 3 && timeDifference > 0) {
        // Reminder SMS
        await sendSMS(
          student.mobile,
          `Reminder: The book "${title}" is due on ${due_date.toLocaleDateString()}. Please return it on time to avoid fines.`
        );
      } else if (timeDifference < 0) {
        // Late submission SMS
        const fineAmount = calculateFine(due_date, currentDate);
        book.fine = fineAmount;
        student.total_fine += fineAmount;

        await sendSMS(
          student.mobile,
          `Overdue: The book "${title}" is overdue. Please return it immediately. Fine: ₹${fineAmount}.`
        );
      }
    }
    await student.save();
  }
}

module.exports = sendNotifications;
