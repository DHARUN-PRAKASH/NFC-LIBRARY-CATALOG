const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const ip = require('ip');  // To print server IP address in terminal
const connectDB = require('./config/db');  // MongoDB connection module
const attendanceRoutes = require('./routes/attendance');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: '*' }
});

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();  // Calls the function to connect to the database

// Middleware to add io to req for WebSocket support in routes
app.use((req, res, next) => {
  req.io = io;  // Attach io instance to req
  next();
});

// Routes
app.use('/attendance', attendanceRoutes);

// Server start with IP address logging
const PORT = 5000;
server.listen(PORT, () => {
  const serverIP = ip.address();
  console.log(`Server running on http://${serverIP}:${PORT}`);
});
