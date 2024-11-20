import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import {
  Container,
  Typography,
  Box,
  Paper,
  Avatar,
  Divider,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AppBarComponent from "../AppBar";
import BooksDataGrid from "./BooksDataGrid";

const socket = io("http://localhost:5000"); // Connect to backend

function BorrowReturnDisplay() {
  const [studentData, setStudentData] = useState(null);
  const [bookData, setBookData] = useState([]);
  const [message, setMessage] = useState("");
  const [action, setAction] = useState(null);

  // Handle real-time NFC data reception
  useEffect(() => {
    socket.on("nfcDataReceived", (data) => {
      console.log("Received NFC data:", data); // Debugging log
      if (data.student) {
        setStudentData(data.student);
        setAction(data.action || ""); // Update action if provided
      }
      if (data.book) {
        setBookData((prevBooks) => [...prevBooks, data.book]);
      }
      setMessage(data.message || "");
    });

    return () => {
      socket.off("nfcDataReceived");
    };
  }, []);

  const handleStopSession = async () => {
    try {
      const response = await fetch("http://localhost:5000/library/stop-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      alert(result.message);
      setStudentData(null);
      setBookData([]);
      setMessage("");
      setAction(null);
    } catch (error) {
      console.error("Error stopping session:", error);
      alert("Failed to stop session. Please try again.");
    }
  };

  return (
    <div>
      <AppBarComponent />
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "auto",
          width: "100%",
          flexDirection: "column",

        }}
      >
        <Paper elevation={4} sx={{ padding: 4, borderRadius: 3, textAlign: "center", width: "100%" ,backgroundColor:"#455a64"}}>
          <Typography variant="h4" gutterBottom color="#ffe393" sx={{ fontWeight: "bold" }}>
            Library Borrow/Return System
          </Typography>
          <Divider sx={{ my: 3 }} />

          {studentData ? (
            <Box sx={{ textAlign: "left" }}>
              <Box display="flex" justifyContent="center" mb={2}>
                <Avatar sx={{ bgcolor: "primary.main", width: 72, height: 72 }}>
                  <LibraryBooksIcon sx={{ fontSize: 40 }} />
                </Avatar>
              </Box>

              <Typography variant="h6" color="#ffe393" gutterBottom >
                Student Session Started
              </Typography>
              <Typography variant="body1" color="#ffe393"><strong>Name:</strong> {studentData.name}</Typography>
              <Typography variant="body1" color="#ffe393"><strong>Department:</strong> {studentData.department}</Typography>
              <Typography variant="body1" color="#ffe393"><strong>Roll No:</strong> {studentData.roll_no}</Typography>
              <Typography variant="body1" color="#ffe393"><strong>Mobile:</strong> {studentData.mobile}</Typography>

              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" color="#ffe393" gutterBottom>
                Books {action === "borrow" ? "to Borrow" : "to Return"}
              </Typography>

              <List>
                {bookData.map((book, index) => (
                  <ListItem key={index} disableGutters>
                    <ListItemText color="#ffe393"
                      primary={`Title: ${book.title}`}
                      secondary={`Author: ${book.author} | Genre: ${book.genre}`}
                    />
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ my: 3 }} />
              <Typography variant="body2" color="#ffe393" sx={{ mt: 2 }}>
                {message}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
                onClick={handleStopSession}
              >
                End Session
              </Button>
            </Box>
          ) : (
            <Box display="flex" flexDirection="column" alignItems="center">
              <LinearProgress color="inherit"
  sx={{ 
    width: '100%', 
    marginBottom: 2, 
    '& .MuiLinearProgress-bar': {
      backgroundColor: '#ffe393',  // Color of the progress bar
    },
    '& .MuiLinearProgress-root': {
      backgroundColor: '#ffe393', // Color of the background/track (optional, if you want a different color for the track)
    }
  }} 
/>
              <Typography variant="body1" color="#ffe393" sx={{ mt: 2 }}>
                Please scan a student ID to start the session.
              </Typography>
            </Box>
          )}
        </Paper>
      </Container>
      <Box sx={{padding:2}}>
      <BooksDataGrid/>
      </Box>
    </div>
  );
}

export default BorrowReturnDisplay;
