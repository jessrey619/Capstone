import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import './header.css'; 

export default function TheHeader() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <Grid item xs={12}>
          <img src="/citu-logoSmall.png" alt="HeaderLogo" className="headerImage" />
        </Grid>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Home
          </Typography>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            About Us
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
