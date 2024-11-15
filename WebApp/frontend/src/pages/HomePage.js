import React from 'react';
import { Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <Box>
    <h1>Library System</h1>
    <Button component={Link} to="/attendance" variant="contained">
      Attendance
    </Button>
    <Button component={Link} to="/borrow" variant="contained" color="primary">
      Borrow Book
    </Button>
    <Button component={Link} to="/return" variant="contained" color="secondary">
      Return Book
    </Button>
  </Box>
);

export default HomePage;
