const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const ip = require('ip');
const mongoose = require('mongoose');
const connectDB = require('./config/db'); // MongoDB connection module
const sendNotifications = require('./controllers/notificationController');
const attendanceRoutes = require('./routes/attendance');
const signInRoutes = require('./routes/signin');
const libraryRoutes = require('./routes/library');
const bookRoutes = require('./routes/books'); // Import Book routes
const studentRoutes = require('./routes/students'); // Import Student routes
const morgan = require('morgan'); // Logging middleware

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: '*' },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // Logs HTTP requests

// MongoDB Connection
connectDB(); // Connect to the MongoDB database

// Attach Socket.IO to req for WebSocket support in routes
app.use((req, res, next) => {
  req.io = io; // Attach io instance to the req object
  next();
});

// API Routes
app.use('/attendance', attendanceRoutes);
app.use('/signin', signInRoutes);
app.use('/library', libraryRoutes);
app.use('/books', bookRoutes); // Add Book routes
app.use('/students', studentRoutes); // Add Student routes

// Global Error Handler (optional)
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// WebSocket Event Handlers
io.on('connection', (socket) => {
  console.log('🔗 A new client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });

  // Example custom WebSocket event
  socket.on('customEvent', (data) => {
    console.log('📩 Received custom event:', data);
    io.emit('responseEvent', { message: 'Acknowledged', receivedData: data });
  });
});

// Notification Sending Logic
const initializeNotifications = async () => {
  try {
    console.log('🔔 Sending notifications...');
    await sendNotifications(); // Call your notification controller
    console.log('✅ Notifications sent successfully');
  } catch (error) {
    console.error('❌ Failed to send notifications:', error.message);
  }
};

// Set up periodic notification sending (e.g., once a day using setInterval)
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
setInterval(initializeNotifications, ONE_DAY_MS);

// Start the server
const PORT = 5000;
server.listen(PORT, () => {
  const serverIP = ip.address();
  console.log(`🚀 Server is running on http://${serverIP}:${PORT}`);
  console.log(`🌐 WebSocket server listening on ws://${serverIP}:${PORT}`);

  // Trigger initial notification sending
  initializeNotifications();
});