import {useState} from "react";
import {
    Button,
    CssBaseline,
    TextField,
    FormControl,
    Grid,
    Box,
    Typography,
    Container} from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';
import axios from 'axios';
import Image from '../SignUpPage/image5.png';
import { Paper } from '@mui/material';
import { positions } from '@mui/system';

export default function SignUpPage() {

    const theme = createTheme();
    const Boxs = styled(Box)`padding-bottom: 1%;`;

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const styles = {
        paperContainer: {
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '100vh',
            width: '100vw',
            backgroundImage: `url(${Image})`
        }
    };
    
    const onPostHandler = async (data) => {
        const {firstName, lastName, email, password} = data;
        const putData = {firstName, lastName, email, password};

        // Post
        await axios.post('http://localhost:8080/signup', putData)
        .then(function(response) {
            console.log(response, "Success");
        })
        .catch(function (err) {
            console.log(err);
        });
    };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const joinData = {
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        email: data.get('email'),
        password: data.get('password'),
        confirmPassword: data.get('confirmPassword')
    };
    const {firstName, lastName, email, password, confirmPassword} = joinData;

    const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if(!emailRegex.test(email)) {
          setEmailError('Not correct email form');
    }
    else {
          setEmailError('');
    }

    if(password !== confirmPassword) {
        setPasswordError('Check password again');
    }
    else {
        setPasswordError('');
    }

    if(emailRegex.test(email) && passwordError.test(password)) {
        onPostHandler(joinData);
    }
  };

  
    return(
        <ThemeProvider theme={theme}>
            <Paper style={styles.paperContainer}>
      <Container component="main" justifyContent="flex-start">
        <CssBaseline />
        <Grid container direction="row" justifyContent="flex-start"  alignItems="center">
            <Grid item xs>
        <Box
            sx={{
                position: "absolute",
                marginTop: '329px',
                height: '760px',
                maxWidth: '809px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography
                sx={{
                    fontFamily: 'Baloo Bhaina 2',
                    fontStyle: 'normal',
                    fontSize: '75px',
                    lineHeight: '15px',
                    letterSpacing: '0.005em',
                    color: '#FFFFFF'
                }}
            >
                Where to first?
            </Typography>
            <Typography
                sx={{
                    marginTop: '228px',
                    fontFamily: 'Baloo Bhaina 2',
                    fontStyle: 'normal',
                    fontSize: '35px',
                    lineHeight: '43px',
                    letterSpacing: '0.005em',
                    color: '#FFFFFF'
                }}
            >
                Perks of a LikeHome account:
            </Typography>
            <Typography
                sx={{
                    marginTop: '65px',
                    fontFamily: 'Baloo Bhaina 2',
                    fontStyle: 'normal',
                    fontSize: '25px',
                    width: '325px',
                    lineHeight: '31px',
                    letterSpacing: '0.005em',
                    color: '#FFFFFF'
                }}
            >
                1. Gain reward points to put towards your next trip.
            </Typography>
            <Typography
                sx={{
                    fontFamily: 'Baloo Bhaina 2',
                    fontStyle: 'normal',
                    fontSize: '25px',
                    width: '325px',
                    lineHeight: '31px',
                    letterSpacing: '0.005em',
                    color: '#FFFFFF'
                }}
            >
                2. Keep track of your past and current reservations.
            </Typography>
            <Typography
                sx={{
                    fontFamily: 'Baloo Bhaina 2',
                    fontStyle: 'normal',
                    fontSize: '25px',
                    width: '325px',
                    lineHeight: '31px',
                    letterSpacing: '0.005em',
                    color: '#FFFFFF'
                }}
            >
                3. Save your information for a faster checkout.
            </Typography>
        </Box>
        </Grid>

        <Grid item xs>
        <Box
          sx={{
            position: "absolute",
            marginTop: '229px',
            height: '760px',
            maxWidth: '809px',
            marginLeft: '300px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'rgba(239, 241, 237, 0.9)',
            borderRadius: '18px',
          }}
        >
          <Typography 
          sx={{
              marginTop: '36px'
          }}>
            Sign Up
          </Typography>
          <Boxs component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={8}>
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
              <Button
                type="submit"
                variant="contained"
                sx={{mt:8, mb:2}}
              >
                Sign up
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