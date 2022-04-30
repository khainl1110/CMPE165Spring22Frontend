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
import fi from 'date-fns/esm/locale/fi/index.js';

export default function EditAccount(props) {

    const location = useLocation();
    const [state, setState] = useState(location.state);
    const [passwordError, setPasswordError] = useState('');
    const [showError, setShowError] = useState(false);

    const firstName = state.firstName;
    const lastName = state.lastName;
    const email = state.email;
    const currentPassword = state.password;
    const points = state.points;
    const paymentId = state.paymentId;

    const backClick = () => {
        window.location.replace("/myAccount");
    }

    const onPutHandler = async (data) => {
        const { firstName, lastName, email, password, points, paymentId } = data;
        const putData = { firstName, lastName, email, password, points, paymentId };

        fetch(backend_url + "/users/", {
            method: 'PUT',
            body: JSON.stringify(putData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                if (data.status !== 200) {
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
        const newPassword = data.get('newPassword');
        const confirmedPassword = data.get('confirmPassword');

        if (newPassword !== confirmedPassword) {
            setShowError(true);
            setPasswordError('Please make sure your passwords match up.');
        }
        else {
            setShowError('');
        }

        if (newPassword === confirmedPassword) {
            if (newPassword === '') {
                const editData = {
                    firstName: data.get('firstName'),
                    lastName: data.get('lastName'),
                    email: email,
                    password: currentPassword,
                    points: points,
                    paymentId: paymentId
                };
                setShowError(false);
                onPutHandler(editData);
            }
            else {
                const editData = {
                    firstName: data.get('firstName'),
                    lastName: data.get('lastName'),
                    email: email,
                    password: newPassword,
                    points: points,
                    paymentId: paymentId
                };
                setShowError(false);
                onPutHandler(editData);
            }
        }
        else {
            setShowError(true);
        }
    }

    const cancelClick = () => {

        window.location.replace("/myAccount");
    }


    if (email !== "") {
        return (
            <div>
                <Grid container direction="column" justifyContent="space-evenly">
                    <Grid item xs={12}>
                        <LoggedInNavBar />
                    </Grid>

                    <Grid item xs={12}>
                        <ListItemButton onClick={backClick} sx={{
                            marginTop: "0px",
                            marginLeft: "8%",
                            width: "400px"
                        }}>
                            <ListItemIcon>
                                <ArrowBackIcon sx={{ fontSize: 25 }} />
                            </ListItemIcon>
                            <ListItemText>
                                <Typography sx={{ fontFamily: 'Baloo-Bhaina-2', fontWeight: 700, fontSize: 20 }}>
                                    Back to My Account
                                </Typography>
                            </ListItemText>
                        </ListItemButton>

                        <CardMedia component="img" alt="banner image" sx={{
                            maxHeight: "400px",
                            width: "100%",
                            objectFit: "fill",

                        }} image={bannerImage} />
                    </Grid>



                </Grid>

                <Grid container direction="column" justify="center" alignItems="center" spacing={0}>
                    <List sx={{
                        width: "50%",
                    }}>
                        <Box sx={{ marginTop: "3%" }}>
                            <Typography sx={{
                                fontSize: 25,
                                fontWeight: 600,
                                fontFamily: 'Baloo-Bhaina-2',
                                marginLeft: '0%'
                            }}>
                                Edit Your Account
                            </Typography>
                            <Typography sx={{
                                fontSize: 22,
                                fontWeight: 600,
                                fontFamily: 'Baloo-Bhaina-2',
                                marginTop: "3%",
                                marginLeft: "2%"
                            }}>
                                Your Info
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} sx={{ marginLeft: "2%", marginTop: "2%" }}>
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

                                        <Grid item xs={12} sx={{ marginTop: "6%" }}>
                                            <TextField
                                                fullWidth
                                                type="password"
                                                id="newPassword"
                                                name="newPassword"
                                                label="New Password"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sx={{ marginTop: "2%" }}>
                                            <TextField
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
                                    <Box textAlign='center' sx={{ marginTop: "5%" }}>
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
                                                        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
                                                    }
                                                }}
                                            >
                                                Update Information
                                            </Button>

                                            <Button
                                                onClick={cancelClick}
                                                sx={{
                                                    fontWeight: 600,
                                                    fontFamily: 'Baloo-Bhaina-2',
                                                    marginLeft: "52%",
                                                    minWidth: "150px",
                                                    color: "black",
                                                    backgroundColor: "#f0f1ed",

                                                    '&:hover': {
                                                        backgroundColor: '#f0f1ed',
                                                        borderColor: '#f7f8f6',
                                                        boxShadow: 'none',
                                                    },
                                                    '&:focus': {
                                                        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
                                                    }
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