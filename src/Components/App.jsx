import React from 'react';
import { Link } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import NavBar from '../Components/NavBar/NavBar.jsx';
import SearchBar from '../Components/LandingPageSearchBar/SearchBar.jsx';
import bg from "../assets/landing_bg.jpg"
import { Typography } from '@material-ui/core';


export default function App() {
  return (
      <Box sx={{
        minHeight: '100vh',
        backgroundImage: `url(${bg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>
        <CssBaseline />
        
        <Box sx={{
          width: 600,
          height: 100,
          mx: "auto",
          my: 70,
          backgroundColor: 'none',
        }}>
          <Typography variant='h2' align='center' >Welcome Home.</Typography>
          <SearchBar />
          <Link to = "/signup">Returning Users</Link>
        </Box>
      </Box>
  );
}