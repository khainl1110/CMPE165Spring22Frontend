import {useState,useEffect} from "react";
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

export default function SignUpPage() {

    const theme = createTheme();
    const Boxs = styled(Box)`padding-bottom: 40px;`;

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    
    const onPostHandler = 
        fetch('http://localhost:8080/')
        .then(data => data.json())
        .then(data => {
            console.log(data)
            alert(data.username)
        });
    
        /*
        fetch('http://localhost:8080/', {
        method: 'post',
        body: JSON.stringify({
            //change the data after backend updated
            username : this.state.firstName,
            password : this.state.password
        })
        
    })
    .then(data => data.json())
    .then(data => console.log(data))
    }, []);
    */

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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Boxs component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                    required 
                    autoFocus
                    id="firstName" 
                    name="firstName" 
                    label="First Name" />
                </Grid>
                <Grid item xs={6}>
                <TextField 
                    required 
                    autoFocus
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
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
              >
                Sign up
              </Button>
            </FormControl>
          </Boxs>
        </Box>
      </Container>
    </ThemeProvider>
    )
}