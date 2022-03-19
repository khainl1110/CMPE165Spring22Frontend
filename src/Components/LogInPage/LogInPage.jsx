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
import NavBar from '../NavBar/NavBar.jsx';
import { backend_url } from "../../links";

import Image from '../../assets/login.jpg';
import { Paper } from '@mui/material';

export default function LogInPage() {

  const theme = createTheme();
  const Boxs = styled(Box)`padding-bottom: 0%;`;

  const [showError, setShowError] = useState(false);

  const styles = {
    paperContainer: {
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
      minHeight: '420px',
      width: '100%',
      backgroundImage: `url(${Image})`
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    let success = false;

    fetch(backend_url + "/users/" + email, { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        if (data.email === email && data.password === password) {
          success = true;
          window.location.replace("/hotelTest");
          localStorage.setItem("email", email);
          console.log("local storage: " + localStorage.getItem("email"));
        }
        if (success === false) {
          setShowError(true);
        }
      })
      .catch(e => {
        console.log('error' + e);
        setShowError(true);
      })
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper style={styles.paperContainer}>
        <Container component="main" justifyContent="flex-start" >
          <CssBaseline />
          <NavBar />
          <Grid container direction="row" justifyContent="flex-start" alignItems="center">
            <Grid item xs={4}>
              <Box
                sx={{
                  position: "absolute",
                  marginTop: '40vh',
                  marginLeft: '3%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '35%',
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
                  padding: '28px',
                }}
              >
                <Typography
                  sx={{
                    fontSize: 21,
                    fontWeight: 'bold',
                    color: 'grey'
                  }}>
                  Login
                </Typography>
                <Boxs component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
                  <FormControl component="fieldset" variant="standard">
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          autoFocus
                          fullWidth
                          type="email"
                          id="email"
                          name="email"
                          label="Email"
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
                    {showError &&
                      <Typography
                        sx={{
                          marginTop: '10px',
                          fontSize: 13,
                          color: 'red',
                          width: '100%',
                          textAlign: 'center',
                        }}>
                        Please make sure you entered the correct email or password.
                      </Typography>
                    }
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ mt: 2, mb: 1, backgroundColor: '#9BB40D', fontWeight: '500' }}
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