import React from 'react';
import { Link } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import SearchBar from '../Components/LandingPageSearchBar/SearchBar.jsx';
import bg from "../assets/landing_bg.jpg"
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';

const theme = createTheme({
});

const styles = {
  paperContainer: {
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
      width: '100vw',
      backgroundImage: `url(${bg})`,
  },
  bottomPage: {
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '40vh',
      width: '100vw',
      backgroundColor: '#8E8A86',
  }
};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Paper style={styles.paperContainer}>
        <Container component="main" justifyContent="center">
          <CssBaseline />
          <Grid container direction="column" justifyContent="flex-start"  alignItems="center">
            <Grid item xs={0}>
            <Box sx={{
                position: "relative",
                marginTop: '400px',
                alignItems: 'left',
            }}
            >
              <Typography variant="h2" sx={{
                    fontFamily: 'Baloo-Bhaina-2',
                    fontWeight: 600,
                    fontSize: '75px',
                    color: '#FFFFFF'
                }}>
                  Welcome Home.
              </Typography>
            </Box>
            <Grid item xs={0}>
              <Box sx={{
                position: "relative",
                marginTop: '50px',
                alignItems: 'center',
              }}
              >
              <Typography variant="h5" sx={{
                    fontFamily: 'Baloo-Bhaina-2',
                    fontWeight: 500,
                    fontSize: '25px',
                    color: '#FFFFFF'
                }}>
                  Start Searching
              </Typography>
              </Box>
            </Grid>
            </Grid>
            <Grid item xs={0}>
              <SearchBar />
            </Grid>
            <Grid item xs={0}>
              <Link to = "/signup">Returning Users</Link>
            </Grid>
          </Grid>
        </Container>
      </Paper>
      <Paper style={styles.bottomPage}>
        <Grid container direction="row" justifyContent="flex-start"  alignItems="center">
          <Grid item xs={0}>
                <Box sx={{
                position: "relative",
                marginTop: '25px',
                marginLeft: '75px',
                alignItems: 'left',
                }}>
                <Typography variant="h3" sx={{
                      fontFamily: 'Baloo-Bhaina-2',
                      fontweight: 600,
                      fontsize: '50px',
                      color: '#FFFFFF'
                  }}>
                    Ideas for your next trip:
                </Typography>
                </Box> 
          </Grid>
        </Grid>
      </Paper>  
    </ThemeProvider>
  );
}