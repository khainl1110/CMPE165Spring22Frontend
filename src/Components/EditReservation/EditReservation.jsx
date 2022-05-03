import React, { useState, useEffect } from "react";
import {
    CssBaseline,
    Grid,
    TextField,
    Typography,
    Container,
    Paper,
    Box,
    Button,
    FormControl
} from '@mui/material/';
import LoggedInNavBar from '../NavBar/LoggedInNavBar.jsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { backend_url } from "../../links";
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DateRangePicker from '@mui/lab/DateRangePicker';
import { useLocation } from "react-router-dom";
import { Inbox } from "@mui/icons-material";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

export default function EditReservation(props) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const theme = createTheme();

    const styles = {
        paperContainer: {
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '100%',
            minHeight: '100vh',
            width: '100%',
        },
        imageContainer: {
            backgroundSize: 'cover',
            position: 'relative',
            minHeight: '200px',
            minWidth: '300px',
        }
    };

    const email = localStorage.getItem('email');

    useEffect(() => {
        if (email !== '') {
            setIsLoggedIn(true);
        }
        // else {
        //     window.location.replace('/');
        // }
    }, [])

    const location = useLocation();

    const [room, setRoom] = useState([]);
    const [state, setState] = useState(location.state);

    const [dates, setDates] = useState([state.checkIn, state.checkOut]);
    const check_in = state.checkIn.substring(0, 10);
    const check_out = state.checkOut.substring(0, 10);
    const differenceInTime = Date.parse(dates[1]) - Date.parse(dates[0]);
    const days = differenceInTime / (1000 * 3600 * 24);
    const totalPrice = days * state.price;
    const currentPoints = state.user.points ? (state.user.points - ((totalPrice - (state.points * 10)) / 2.0)) : 0;
    const changedPoints = currentPoints + ((totalPrice - (state.points * 10)) / 2.0);

    const roomID = state.roomId;

    useEffect(() => {

        fetch(backend_url + "/room/" + roomID, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                setRoom(data);
            })
            .catch(e => {
                console.log('error' + e);
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        const diffInTime = Date.parse(check_out) - Date.parse(check_in);
        const numDays = diffInTime / (1000 * 3600 * 24);
        const oldPrice = numDays * state.price;
        console.log('POINTS REDEEMED: ' + state.points);
        console.log('PREVIOUS PRICE: ' + oldPrice);
        console.log('Current Price: ' + totalPrice);
        console.log('Current price - discount: ' + (totalPrice - (state.points / 10)));
        console.log('Points that were earned in the past reservation: ' + ((oldPrice - (state.points / 10)) / 2));
        console.log('Points that should be earned for the updated reservation: ' + ((totalPrice - (state.points / 10)) / 2))
        const currPoints = state.user.points ? state.user.points : 0;
        const currPointsMinusPastReservationEarnedPoints = currPoints - (oldPrice / 2.0);
        console.log('curr points - old reservation: ' + currPointsMinusPastReservationEarnedPoints);
        // const currPoints = state.user.points ? (state.user.points - ((finalPrice - (state.points * 10)) / 2.0)) : 0;
        console.log('curr points in user`s account: ' + currPoints);
        const newTotalPoints = currPointsMinusPastReservationEarnedPoints + ((totalPrice - (state.points / 10.0)) / 2.0);
        console.log("NEW TOTAL POINTS: " + newTotalPoints);

        const reservationData = {
            id: state.reservId,
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            pointsRedeemed: state.points,
            userEmail: email,
            roomId: roomID,
            price: totalPrice,
            check_in: dates[0],
            check_out: dates[1],
            numGuest: state.guest,
            paymentId: state.paymentId,
            newTotalPoints
        }

        nextClick(reservationData);
    }

    const nextClick = async (data) => {
        const { id, firstName, lastName, userEmail, roomId, price, check_in, check_out, numGuest, paymentId, pointsRedeemed, newTotalPoints } = data;
        const putData = {
            id,
            firstName,
            lastName,
            userEmail,
            roomId,
            price,
            check_in,
            check_out,
            numGuest,
            paymentId,
            pointsRedeemed
        };

        // console.log(putData);

        fetch(backend_url + "/reservation/" + state.reservId, {
            method: 'PUT',
            body: JSON.stringify(putData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            alert("Successfully modified! The updated price of your reservation is: $" + price + "."),

        )

        if (isLoggedIn) {
            const userPointData = {
                firstName: state.user.firstName,
                lastName: state.user.lastName,
                email: state.user.email,
                password: state.user.password,
                points: newTotalPoints,
                paymentId: state.user.paymentId,
            }

            console.log(userPointData);

            fetch(backend_url + "/users", {
                method: 'PUT',
                body: JSON.stringify(userPointData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            window.location.replace("/myBookings")
        }

    };

    const backClick = () => {
        window.location.replace("/myBookings");
    };



    return (
        <ThemeProvider theme={theme}>
            <Paper style={styles.paperContainer}>
                <CssBaseline />
                {isLoggedIn &&
                    <Container component="main" justify="flex-start">
                        <LoggedInNavBar />
                        <Grid container direction="row" justify="flex-start" alignItems="center" width="100%">
                            <ListItemButton onClick={backClick} sx={{
                                maxWidth: '40%',
                                marginTop: '8%'
                            }}>
                                <ListItemIcon>
                                    <ArrowBackIcon />
                                </ListItemIcon>
                                <ListItemText>
                                    <Typography sx={{ fontWeight: 700, fontSize: 14 }}>
                                        Back to My Bookings
                                    </Typography>
                                </ListItemText>
                            </ListItemButton>

                            <List sx={{
                                width: '100%',
                                minWidth: '600px',
                                marginTop: '0%',
                                marginBottom: "0%",
                                alignItems: 'center',
                                justifyContent: "center",
                            }}>
                                <Box>
                                    <ListItem>
                                        <Typography sx={{
                                            fontSize: 19,
                                            fontWeight: 600,
                                        }}>
                                            Modify Your Reservation:
                                        </Typography>
                                        <Typography sx={{
                                            fontSize: 19,
                                            fontWeight: 400,
                                            marginLeft: "1%",
                                            color: "#a7bd2a",
                                            textDecoration: 'underline',
                                        }}>
                                            {room.hotelName}
                                        </Typography>
                                    </ListItem>


                                    <ListItem>
                                        <Grid item xs={0}>
                                            <Grid container direction="row" justifyContent="left" alignItems="center" spacing={0} sx={{ position: "static", marginTop: '0%', backgroundColor: '#e6edea', borderRadius: 2, }}>
                                                <Grid item xs={0}>
                                                    <Paper style={styles.imageContainer} sx={{ backgroundImage: `url(${room.image})`, }}>
                                                    </Paper>
                                                </Grid>

                                                <Grid item xs={5}>
                                                    <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={0} sx={{
                                                        position: "static", marginLeft: '10%', width: '100%'
                                                    }}>
                                                        <Grid item xs={0}>
                                                            <Typography variant="h3" sx={{
                                                                fontWeight: 600,
                                                                fontSize: '16px',
                                                                color: '#424242',
                                                                paddingTop: '10px',
                                                            }}>
                                                                {room.roomInfo}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={0}>
                                                            <Typography variant="h2" sx={{
                                                                fontWeight: 400,
                                                                fontSize: '14px',
                                                                color: '#606060',
                                                                marginTop: '4%'
                                                            }}>
                                                                {room.location}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={0}>
                                                            <Typography variant="h2" sx={{
                                                                fontWeight: 400,
                                                                fontSize: '14px',
                                                                color: '#606060',
                                                                marginTop: '4%'
                                                            }}>
                                                                {room.amenities}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={0}>
                                                            <Typography variant="h2" sx={{
                                                                fontWeight: 400,
                                                                fontSize: '14px',
                                                                color: '#606060',
                                                                marginTop: '2%'
                                                            }}>
                                                                Description: {room.description}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={0}>
                                                            <Grid container direction="row" justifyContent="left" alignItems="center" spacing={1.5} sx={{ position: "static", marginTop: '6%', }}>
                                                                <Grid item xs={0}>
                                                                    <Grid container direction="column" justifyContent="flex-start" alignItems="center" spacing={0} sx={{ marginLeft: '0%', position: "static" }}>
                                                                        <Grid item xs={0}>
                                                                            <Typography sx={{
                                                                                fontWeight: 200,
                                                                                fontSize: '14px',
                                                                                color: '#646464',
                                                                            }}>
                                                                                Check In
                                                                            </Typography>
                                                                        </Grid>
                                                                        <Grid item xs={0}>
                                                                            <Typography sx={{
                                                                                fontWeight: 300,
                                                                                fontSize: '16px',
                                                                                color: '#646464',
                                                                            }}>
                                                                                {check_in}
                                                                            </Typography>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid item xs={0}>
                                                                    <Grid container direction="column" justifyContent="flex-start" alignItems="center" spacing={0} sx={{ marginLeft: '0%', position: "static" }}>
                                                                        <Grid item xs={0}>
                                                                            <Typography sx={{
                                                                                fontWeight: 200,
                                                                                fontSize: '14px',
                                                                                color: '#646464',
                                                                            }}>
                                                                                Check Out
                                                                            </Typography>
                                                                        </Grid>
                                                                        <Grid item xs={0}>
                                                                            <Typography sx={{
                                                                                fontWeight: 300,
                                                                                fontSize: '16px',
                                                                                color: '#646464',
                                                                            }}>
                                                                                {check_out}
                                                                            </Typography>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid item xs={0}>
                                                                    <Typography sx={{
                                                                        fontWeight: 100,
                                                                        fontSize: '40px',
                                                                        color: '#646464',
                                                                    }}>
                                                                        |
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item xs={0}>
                                                                    <Grid container direction="column" justifyContent="flex-start" alignItems="center" spacing={0} sx={{ marginLeft: '0%', position: "static" }}>
                                                                        <Grid item xs={0}>
                                                                            <Typography sx={{
                                                                                fontWeight: 200,
                                                                                fontSize: '14px',
                                                                                color: '#646464',
                                                                            }}>
                                                                                Guests
                                                                            </Typography>
                                                                        </Grid>
                                                                        <Grid item xs={0}>
                                                                            <Typography sx={{
                                                                                fontWeight: 300,
                                                                                fontSize: '16px',
                                                                                color: '#646464',
                                                                            }}>
                                                                                {state.guest}
                                                                            </Typography>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>

                                                    </Grid>
                                                </Grid>

                                                <Grid item xs={0}>
                                                    <Grid container direction="column" justifyContent="right" alignItems="flex-end" spacing={0} sx={{ marginLeft: '100%', marginBottom: "170%", position: "static" }}>
                                                        <Grid item xs={0}>
                                                            <Grid container direction="row" justifyContent="left" alignItems="center" spacing={0} sx={{ position: "static", marginTop: "0%", }}>
                                                                <Grid item xs={0}>
                                                                    <Typography variant="h2" sx={{
                                                                        fontWeight: 700,
                                                                        fontSize: '24px',
                                                                        color: '#606060',
                                                                    }}>
                                                                        $ {totalPrice}
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>
                                                            <Typography variant="h2" sx={{
                                                                fontWeight: 400,
                                                                fontSize: '14px',
                                                                color: '#606060',
                                                            }}>
                                                                for {days} nights
                                                            </Typography>
                                                        </Grid>

                                                    </Grid>

                                                </Grid>
                                            </Grid>


                                        </Grid>
                                    </ListItem>
                                </Box>

                                <List sx={{
                                    width: '70%',
                                }}>
                                    <Box component="form" onSubmit={handleSubmit} sx={{ marginLeft: "2%" }}>
                                        <FormControl component="fieldset" variant="standard">
                                            <Box sx={{ marginTop: "2%" }}>
                                                <Typography sx={{
                                                    fontSize: 17,
                                                    fontWeight: 600,
                                                    // fontFamily: 'Baloo-Bhaina-2',
                                                }}>
                                                    Your Info
                                                </Typography>
                                                <ListItem sx={{ marginTop: '1%' }}>
                                                    <ListItemText>
                                                        <TextField
                                                            required
                                                            autoFocus
                                                            id="firstName"
                                                            name="firstName"
                                                            label="First Name"
                                                            defaultValue={state.firstName}
                                                            sx={{
                                                                width: "90%"
                                                            }}
                                                            size="small"
                                                        />
                                                    </ListItemText>
                                                    <ListItemText>
                                                        <TextField
                                                            required
                                                            autoFocus
                                                            id="lastName"
                                                            name="lastName"
                                                            label="Last Name"
                                                            defaultValue={state.lastName}
                                                            sx={{
                                                                width: "90%"
                                                            }}
                                                            size="small"
                                                        />
                                                    </ListItemText>

                                                </ListItem>
                                            </Box>

                                            <Box sx={{ marginTop: "2%", marginBottom: "2%" }}>
                                                <Typography sx={{
                                                    fontSize: 17,
                                                    fontWeight: 600,
                                                    // fontFamily: 'Baloo-Bhaina-2',
                                                }}>
                                                    Booking Details
                                                </Typography>
                                                <ListItem sx={{
                                                    marginTop: '1%'
                                                }}>
                                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                        < DateRangePicker
                                                            startText="Check-in"
                                                            endText="Check-out"
                                                            value={dates}
                                                            sx={{
                                                                width: "90%",
                                                            }}
                                                            onChange={(newValue) => {
                                                                setDates(newValue);
                                                            }}
                                                            renderInput={(startProps, endProps) => (
                                                                <React.Fragment>
                                                                    <TextField required autoFocus sx={{}} value={dates[0]} {...startProps} size="small" />
                                                                    <TextField required autoFocus sx={{ marginLeft: "10%" }} value={dates[1]} {...endProps} size="small" />
                                                                </React.Fragment>
                                                            )}
                                                        />
                                                    </LocalizationProvider>


                                                </ListItem>
                                                <ListItem sx={{ display: 'flex', justifyContent: 'flex-right', marginTop: "2%" }}>
                                                    <Typography sx={{ width: "100%", fontSize: 14, fontWeight: 500 }}>
                                                        Modifications to reservations that change the check-in or check-out date are dependent on your hotel’s availability for your chosen room type. We cannot guarantee that your room will be available for your new dates. Your reservation will not change if your new dates are unavailable.
                                                    </Typography>
                                                </ListItem>
                                            </Box>

                                            <Box sx={{ marginTop: "2%" }}>
                                                <ListItemText>
                                                    <Button type="submit" variant="contained" sx={{
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
                                                    }}>Confirm Reservation</Button>
                                                </ListItemText>
                                            </Box>
                                        </FormControl>
                                    </Box>

                                </List>



                            </List>

                        </Grid>
                    </Container>
                }
            </Paper >
        </ThemeProvider >
    )
}