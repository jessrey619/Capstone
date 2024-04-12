import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GoogleFontsLink from '../responsive/googleFont';

const theme = createTheme({
  typography: {
    fontFamily: 'Kumbh Sans, sans-serif', 
    fontWeight: 'Bold',
  },
});

export default function TheHeader() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
            <Grid item xs={12}>
              <img src="/citu-logoSmall.png" alt="HeaderLogo" className="headerImage" style={{ width: '300px', marginRight: '20px' }}/>
           <GoogleFontsLink/>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Home
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              About Us
            </Typography>
            </Grid>
      </Box>
    </ThemeProvider>
  );
}
