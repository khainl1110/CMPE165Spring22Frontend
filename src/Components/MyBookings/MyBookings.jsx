import React, { useState, useEffect } from "react";
import {
    CssBaseline,
    Grid,
    Box,
    Typography,
    Container,
    Paper,
} from '@mui/material/';
import LoggedInNavBar from '../NavBar/LoggedInNavBar.jsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { backend_url } from "../../links";
import List from '@mui/material/List';
import ReservationCard from "./ReservationCard.jsx";
import PastReservationCard from "./PastReservationCard.jsx";

export default function MyAccount() {
    const [rooms, setRooms] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [user, setUser] = useState();
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
        }
    };

    useEffect(() => {
        if(localStorage.getItem('email') !== '') {
            setIsLoggedIn(true);
        }
        else {
            window.location.replace("/");
        }
    })

    useEffect(() => {
        let email = localStorage.getItem('email');

        fetch(backend_url + "/users/" + email, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                setUser(data);
            })
            .catch(e => {
                console.log('error' + e);
            })
    }, [])

    useEffect(() => {
        fetch(backend_url + "/reservation", { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                setReservations(data);
            })
            .catch(e => {
                console.log('error' + e);
            })
    }, [])

    useEffect(() => {
        fetch(backend_url + "/room", { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                setRooms(data);
            })
            .catch(e => {
                console.log('error' + e);
            })
    }, [])

    // change the some values of isBooked from false to true
    // after reservation start date and expired date come out,
    // we can change some code.
    let isBookedRooms = [];

    for (let i = 0; i < rooms.length; i++) {
        if (rooms[i].booked === true) {
            isBookedRooms.push(rooms[i]);
        }
    }

    let roomId = [];
    for (let i = 0; i < reservations.length; i++) {
        if (reservations[i].userEmail === user.email) {
            roomId.push(reservations[i].roomId);
        }
    }

    let reservedRooms = [];

    for (let i = 0; i < roomId.length; i++) {
        for (let j = 0; j < isBookedRooms.length; j++) {
            if (roomId[i] === isBookedRooms[j].id) {
                reservedRooms.push(isBookedRooms[j]);
            }
        }
    }

    // instant value for demo
    let now = new Date();
    const checkIn = "3/30/2022";
    const checkOut = "3/31/2022";
    const pastCheckIn = "2/18/2022";
    const pastCheckOut = "2/19/2022";

    return (
        <ThemeProvider theme={theme}>
            <Paper style={styles.paperContainer}>
                <CssBaseline />
                {isLoggedIn &&
                <Container component="main" justifyContent="flex-start">
                    <LoggedInNavBar />
                    <Grid container direction="row" justifyContent="flex-start" alignItems="center" width="100%">
                        <List sx={{
                            width: '70%',
                            minWidth: '600px',
                            marginTop: '8%',
                            marginBottom: "10%",
                            alignItems: 'center',
                            justifyContent: "center",
                        }}>
                            <Typography sx={{
                                fontSize: 26,
                                fontWeight: 600,

                            }}>My Bookings</Typography>
                            <Box sx={{
                                marginTop: "3%"
                            }}>

                                <Typography bgcolor="#475718" color="white" sx={{
                                    padding: 2,
                                    fontSize: 20,
                                    fontWeight: 600
                                }}>Current Bookings</Typography>

                                <List sx={{
                                    width: '100%',
                                }}>
                                    <Box>
                                        {
                                            reservedRooms.map(room => {
                                                return (
                                                    <Grid container sx={{
                                                        border: 1,
                                                        borderColor: "#eeeeee",
                                                        backgroundColor: "#fafafa"
                                                    }}>
                                                        <ReservationCard
                                                            hotelName={room.hotelName}
                                                            description={room.description}
                                                            price={room.price}
                                                            image={room.image}
                                                            checkIn={checkIn}
                                                            checkOut={checkOut}
                                                            firstName={user.firstName}
                                                            lastName={user.lastName}
                                                            email={user.email}
                                                        />
                                                    </Grid>
                                                )
                                            })
                                        }
                                    </Box>
                                </List>
                            </Box>

                            <Box sx={{
                                marginTop: "5%"
                            }}>

                                <Typography bgcolor="#475718" color="white" sx={{
                                    padding: 2,
                                    fontSize: 20,
                                    fontWeight: 600
                                }}>Past Bookings</Typography>

                                <List sx={{
                                    width: '100%',
                                }}>
                                    <Box>
                                        {
                                            reservedRooms.map(room => {
                                                return (
                                                    <Grid container sx={{
                                                        border: 1,
                                                        borderColor: "#eeeeee",
                                                        backgroundColor: "#fafafa"
                                                    }}>
                                                        <PastReservationCard
                                                            hotelName={room.hotelName}
                                                            description={room.description}
                                                            price={room.price}
                                                            image={room.image}
                                                            checkIn={pastCheckIn}
                                                            checkOut={pastCheckOut}
                                                            firstName={user.firstName}
                                                            lastName={user.lastName}
                                                            email={user.email}
                                                        />
                                                    </Grid>
                                                )
                                            })
                                        }
                                    </Box>
                                </List>
                            </Box>
                        </List>

                    </Grid>
                </Container>
                }
            </Paper>
        </ThemeProvider>
    )
}