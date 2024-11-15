import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Container, Typography, Box, Paper, Avatar, Divider, LinearProgress } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppBarComponent from '../AppBar';

const socket = io('http://localhost:5000'); // Change this to your backend IP if necessary

function AttendanceDisplay() {
  const [nfcData, setNfcData] = useState(null);

  useEffect(() => {
    socket.on('nfcDataReceived', (data) => {
      setNfcData(data);
    });

    return () => {
      socket.off('nfcDataReceived');
    };
  }, []);

  return (
    <div>
      <AppBarComponent />
      <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto', width: '100' }}>
        <Paper elevation={4} sx={{ padding: 4, borderRadius: 3, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>
            NFC Attendance System
          </Typography>
          <Divider sx={{ my: 3 }} />

          {nfcData ? (
            <Box sx={{ textAlign: 'left' }}>
              <Box display="flex" justifyContent="center" mb={2}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 72, height: 72 }}>
                  <AccountCircleIcon sx={{ fontSize: 40 }} />
                </Avatar>
              </Box>

              <Typography variant="h6" color="secondary" gutterBottom>
                Scanned Student Details
              </Typography>
              <Typography variant="body1"><strong>Name:</strong> {nfcData.student.name}</Typography>
              <Typography variant="body1"><strong>Department:</strong> {nfcData.student.department}</Typography>
              <Typography variant="body1"><strong>Roll No:</strong> {nfcData.student.roll_no}</Typography>
              <Typography variant="body1"><strong>Mobile:</strong> {nfcData.student.mobile}</Typography>

              <Divider sx={{ my: 3 }} />
              <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                {nfcData.message}
              </Typography>
            </Box>
          ) : (
            <Box display="flex" flexDirection="column" alignItems="center">
              {/* Linear Progress Bar for loading */}
              <LinearProgress sx={{ width: '100%', marginBottom: 2 }} />
              <Typography variant="body1" sx={{ mt: 2 }}>
                Please scan an NFC tag.
              </Typography>
            </Box>
          )}
        </Paper>
      </Container>
    </div>
  );
}

export default AttendanceDisplay;
