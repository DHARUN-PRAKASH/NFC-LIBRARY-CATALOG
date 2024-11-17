import React, { useState } from 'react';
import { AppBar as MuiAppBar, Toolbar, Typography, Button, IconButton, Box, Container, Drawer, List, ListItem, ListItemText, Divider, Menu, MenuItem, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const AppBarComponent = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleAccountMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (section) => {
    console.log(`Navigating to ${section}`);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('logged');
    window.location.assign("/")
  };

  return (
    <Box>
      {/* Main AppBar */}
      <MuiAppBar position="sticky" sx={{ backgroundColor: '#1976d2',borderRadius:'10px' }}>
        <Toolbar>
          {/* Menu Icon to open Drawer */}
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>

          {/* Title */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <b>NFC LIBRARY CATLOG </b>
          </Typography>

          {/* Account Icon */}
          <IconButton color="inherit" onClick={handleAccountMenuOpen}>
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </MuiAppBar>

      {/* Drawer for navigation */}
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle} >
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListItem button onClick={() => handleNavigate('home')}>
              <HomeIcon sx={{ mr: 2 }} />
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={() => handleNavigate('attendance')}>
              <CheckCircleIcon sx={{ mr: 2 }} />
              <ListItemText primary="Attendance" />
            </ListItem>
            <ListItem button onClick={() => handleNavigate('borrow')}>
              <LibraryBooksIcon sx={{ mr: 2 }} />
              <ListItemText primary="Borrow Book" />
            </ListItem>
            <ListItem button onClick={() => handleNavigate('return')}>
              <ImportContactsIcon sx={{ mr: 2 }} />
              <ListItemText primary="Return Book" />
            </ListItem>
          </List>
          <Divider />
        </Box>
      </Drawer>

      {/* Account Menu */}
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleAccountMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        
        }}
      >
        <MenuItem onClick={() => console.log("Viewing Profile")}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      {/* Content of the page */}
      <Container sx={{ marginTop: 4 }}>
        {/* Place content here (e.g., Attendance Display, Borrow Book, etc.) */}
      </Container>
    </Box>
  );
};

export default AppBarComponent;
