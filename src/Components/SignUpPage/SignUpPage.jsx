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
import axios from 'axios';
import Image from '../../assets/signupPage/image5.png';
import { Paper } from '@mui/material';
import { positions } from '@mui/system';
import PerksInfo from "./PerksInfo";
import { backend_url } from "../../links";
import NavBar from '../NavBar/NavBar.jsx';

export default function SignUpPage() {

  const theme = createTheme();
  const Boxs = styled(Box)`padding-bottom: 0%;`;

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [showError, setShowError] = useState(false);

  const styles = {
    paperContainer: {
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
      minHeight: '750px',
      width: '100%',
      backgroundImage: `url(${Image})`
    }
  };

  const onPostHandler = async (data) => {
    const { firstName, lastName, username, email, password } = data;
    const putData = { username, email, password };

    // Post, create a user
    // axios return network error
    fetch(backend_url + "/users", {
      method: 'POST',
      body: JSON.stringify(putData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(data => {
        if (data.status !== 200)
          alert("Having error")
        else
          alert("Successfully created user")
      })
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const joinData = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
      confirmPassword: data.get('confirmPassword')
    };
    const { firstName, lastName, username, email, password, confirmPassword } = joinData;

    console.log("Sign Up local storage: " + localStorage.getItem("email"))
    const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegex.test(email)) {
      setShowError(true);
      setEmailError('Please make sure you entered the correct email.');
    }
    else {
      setEmailError('');
    }

    if (password !== confirmPassword) {
      setShowError(true);
      setPasswordError('Please make sure your passwords match up.');
    }
    else {
      setPasswordError('');
    }

    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      setShowError(true);
      setNameError('Please make sure you entered a name.');
    }
    else {
      setNameError('');
    }

    // error with passwordError.test is not a function
    // if (emailRegex.test(email) && passwordError.test(password)) {
    //   onPostHandler(joinData);
    // }

    // add more condition and fix the error
    if (emailRegex.test(email) && password === confirmPassword && nameRegex.test(firstName) && nameRegex.test(lastName)) {
      setShowError(false);
      onPostHandler(joinData);
    }
    else {
      setShowError(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper style={styles.paperContainer}>
        <Container component="main" justifyContent="flex-start">
          <CssBaseline />
          <NavBar />
          <Grid container direction="row" justifyContent="flex-start" alignItems="center">
            <PerksInfo />
            <Grid item xs={0}>
              <Box
                sx={{
                  position: "absolute",
                  marginTop: '12%',
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
                    fontSize: 22,
                    fontWeight: 'bold',
                    color: 'grey'
                  }}>
                  Sign Up
                </Typography>
                <Boxs component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                  <FormControl component="fieldset" variant="standard">
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          required
                          autoFocus
                          fullWidth
                          id="firstName"
                          name="firstName"
                          label="First Name" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          required
                          autoFocus
                          fullWidth
                          id="lastName"
                          name="lastName"
                          label="Last Name" />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          autoFocus
                          fullWidth
                          id="username"
                          name="username"
                          label="User Name"
                        />
                      </Grid>
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
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          label="Confirm Password"
                          error={passwordError !== '' || false}
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
                        {emailError} {nameError} {passwordError}
                      </Typography>
                    }
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ mt: 2, mb: 0, backgroundColor: '#9BB40D', fontWeight: '500' }}
                    >
                      Sign up
                    </Button>
                    <Typography
                      sx={{
                        marginTop: '16px',
                        fontSize: 13,
                        color: 'grey',
                        width: '50%',
                        textAlign: 'center',
                        marginLeft: '25%',
                      }}>
                      By creating an account, I agree to the LikeHome terms and conditions.
                    </Typography>
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