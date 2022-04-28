import { useEffect, useState } from 'react';
import LoggedInNavBar from '../../NavBar/LoggedInNavBar.jsx';
import { backend_url } from "../../../links";
import {
    Button,
    CssBaseline,
    TextField,
    FormControl,
    Grid,
    Box,
    Typography,
    Container,
    Paper,
    CardMedia,
    Card,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemButton
  } from '@mui/material/';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import bannerImage from "../../../assets/accountPage/banner.jpg";
import { useLocation } from "react-router-dom";

export default function EditAccount(props) {

    const location = useLocation();
    const [state, setState] = useState(location.state);
    const [passwordError, setPasswordError] = useState('');
    const [showError, setShowError] = useState(false);

    const firstName = state.firstName;
    const lastName = state.lastName;
    const password = state.password;
    const email = state.email;
    const points = state.points;
    const paymentId = state.paymentId;
    
    const backClick = () => {
        window.location.replace("/myAccount");
    }

    const onPutHandler = async (data) => {
        const {firstName, lastName, email, password, points, paymentId} = data;
        const putData = {firstName, lastName, email, password, points, paymentId};

        fetch(backend_url + "/users/", {
            method: 'PUT',
            body: JSON.stringify(putData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(data => {
            if(data.status !== 200) {
                alert("Error occurred")
            }
            else {
                window.location.replace("/myAccount");
                console.log("Successfully updated account!");
            }
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const editData = {
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            password: data.get('newPassword'),
            confirmPassword: data.get('confirmPassword'),
            points: points,
            paymentId: paymentId
        };

        console.log(editData);

        const {password, confirmPassword} = editData;

        if (password !== confirmPassword) {
            setShowError(true);
            setPasswordError('Please make sure your passwords match up.');
          }
          else {
            setPasswordError('');
        }
        
        if(password === confirmPassword) {
            onPutHandler(editData);
        }
        
    }

    const cancelClick = () => {
        
        window.location.replace("/myAccount");
    }

    
    if(email !== "") {
    return (
        <div>
            <Grid container direction="column" justifyContent="space-evenly">
                <Grid item xs={12}>
                    <LoggedInNavBar />
                </Grid>
                
                <Grid item xs={12}>
                    <ListItemButton onClick={backClick} sx={{
                                marginTop: "80px",
                                marginLeft: "30px",
                                width: "400px"
                            }}>
                            <ListItemIcon>
                                <ArrowBackIcon sx={{fontSize: 35}}/>
                            </ListItemIcon>
                            <ListItemText>
                                <Typography sx={{fontFamily: 'Baloo-Bhaina-2', fontWeight: 700, fontSize: 30}}>
                                    Back to My Bookings
                                </Typography>
                            </ListItemText>
                        </ListItemButton>

                    <CardMedia component="img" alt="banner image" sx={{
                        maxHeight: "100px",
                        width: "100%",
                        objectFit: "fill",
                        
                    }} image={bannerImage} />
                </Grid>

                

            </Grid>

            <Grid container direction="column" justify="center" alignItems="center" spacing={0}>
                <List sx={{
                    marginTop: "5%",
                    width: "80%",
                }}>
                    <Box sx={{marginTop: "5%"}}>
                        <Typography sx={{
                            fontSize: 25,
                            fontWeight: 600,
                            fontFamily: 'Baloo-Bhaina-2',
                            }}>
                            Edit Your Account
                        </Typography>
                        <Typography sx={{
                            fontSize: 22,
                            fontWeight: 600,
                            fontFamily: 'Baloo-Bhaina-2',
                            marginTop: "4%",
                            marginLeft: "2%"
                        }}>
                            Your Info
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{marginLeft: "2%", marginTop: "5%"}}>
                            <FormControl component="fieldset" variant="standard">
                                <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                    required
                                    autoFocus
                                    fullWidth
                                    id="firstName"
                                    name="firstName"
                                    label="First Name"
                                    defaultValue={firstName}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                    required
                                    autoFocus
                                    type="string"
                                    fullWidth
                                    id="lastName"
                                    name="lastName"
                                    label="Last Name"
                                    defaultValue={lastName}
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{marginTop: "2%"}}>
                                    <TextField
                                    required
                                    autoFocus
                                    fullWidth
                                    type="email"
                                    id="email"
                                    name="email"
                                    label="Email"
                                    defaultValue={email}
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{marginTop: "7%"}}>
                                    <TextField
                                    required
                                    fullWidth
                                    type="password"
                                    id="currPassword"
                                    name="currPassword"
                                    label="Current Password"
                                    defaultValue={password}
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{marginTop: "2%"}}>
                                    <TextField
                                    required
                                    fullWidth
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    label="New Password"
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{marginTop: "2%"}}>
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
                                    {passwordError}
                                </Typography>
                                }
                                <Box textAlign='center' sx={{marginTop: "5%"}}>
                                    <ListItemText>
                                        
                                        <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ 
                                            fontWeight: 600,
                                            fontFamily: 'Baloo-Bhaina-2',
                                            minWidth: "200px",
                                            color: "white", 
                                            backgroundColor: "#9BB40D", 
                                            
                                            '&:hover': {
                                                backgroundColor: '#9BB40D',
                                                borderColor: '#0062cc',
                                                boxShadow: 'none',
                                            },
                                            '&:focus': {
                                            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',} 
                                            }}
                                        >
                                        Save & Update
                                        </Button>
                                        
                                        <Button
                                        onClick={cancelClick}
                                        sx={{
                                            fontWeight: 600,
                                            fontFamily: 'Baloo-Bhaina-2',
                                            marginLeft: "10%",
                                            minWidth: "150px",
                                            color: "black", 
                                            backgroundColor: "#f0f1ed", 
                                            
                                            '&:hover': {
                                                backgroundColor: '#f0f1ed',
                                                borderColor: '#f7f8f6',
                                                boxShadow: 'none',
                                            },
                                            '&:focus': {
                                            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',}
                                        }}
                                        >
                                        Cancel
                                        </Button>
                                    
                                    </ListItemText>
                                </Box>
                            </FormControl>
                        </Box>
                    </Box>

                </List>
            </Grid>
            
        </div>
    )
    }
    else {
        window.location.replace('/');
    }
}