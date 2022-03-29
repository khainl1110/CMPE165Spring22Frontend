import { useState } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  FormControl,
  Grid,
  Box,
  Typography,
  Container
} from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';

import Image from '../../assets/login.jpg';
import { Paper } from '@mui/material';

import syk from '../LogInPage/login.module.css';

export default function LogInPage() {

  const theme = createTheme();
  const Boxs = styled(Box)`padding-bottom: 0%;`;

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const styles = {
    paperContainer: {
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
      width: '100%',
      backgroundImage: `url(${Image})`
    }
  };


  const handleLogIn = (e) => {
    console.log("abcd");
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper style={styles.paperContainer}>
        <div className={syk.header}>
          <ul className={syk.headerUl}>
            <li>Like Home</li>
          </ul>
        </div>
        <Container component="main" justifyContent="flex-start" >
          <CssBaseline />

          <Grid container direction="row" justifyContent="flex-start" alignItems="center">
            <Grid item xs={4}>
              <Box
                sx={{
                  position: "absolute",
                  marginTop: '40vh',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '40%',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Baloo Bhaina 2',
                    fontStyle: 'normal',
                    fontSize: '60px',
                    letterSpacing: '0.005em',
                    color: '#FFFFFF',
                    width: '100%',
                    textAlign: 'center',
                  }}
                >
                  Where to next?
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={0}>
              <Box
                sx={{
                  position: "absolute",
                  marginTop: '30vh',
                  maxWidth: '40%',
                  marginLeft: '15%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: 'rgba(239, 241, 237, 0.9)',
                  borderRadius: '18px',
                  padding: '30px',
                }}
              >
                <Typography
                  sx={{
                    marginTop: '16px',
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: 'grey'
                  }}>
                  Login
                </Typography>
                <Boxs component="form" noValidate onSubmit={handleLogIn} sx={{ mt: 3 }}>
                  <FormControl component="fieldset" variant="standard">
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          autoFocus
                          fullWidth
                          type="email"
                          id="email"
                          name="email"
                          label="Email"
                          error={emailError !== '' || false}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          type="password"
                          id="password"
                          name="password"
                          label="Password"
                        />
                      </Grid>


                    </Grid>
                    <Button onSubmit={handleLogIn()}
                      type="submit"
                      variant="contained"
                      sx={{ mt: 5, mb: 1, backgroundColor: '#9BB40D', fontWeight: '500' }}
                    >
                      Login
                    </Button>
                  </FormControl>
                </Boxs>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </ThemeProvider>
  )
}