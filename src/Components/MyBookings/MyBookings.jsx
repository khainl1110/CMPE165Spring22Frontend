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
    const [email, setEmail] = useState(localStorage.getItem('email'));

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
        const e = localStorage.getItem('email');
        if (e) {
            console.log(email);
            setEmail(email);
        } else { console.log("NO EMAIL") }
    }, [])

    // const email = localStorage.getItem('email');

    useEffect(() => {
        if (email !== '') {
            fetch(backend_url + "/users/" + email, { method: 'GET' })
                .then(response => response.json())
                .then(data => {
                    setUser(data);
                })
                .catch(e => {
                    console.log('error' + e);
                })
        }
        else {
            window.location.replace('/');
        }
    }, [])

    useEffect(() => {
        fetch(backend_url + "/reservation", { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                setReservations(data);
                console.log(data);
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
        isBookedRooms.push(rooms[i]);
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

    // the check in and check out time values are from reservations
    // without payment, they might be null

    // time now
    const today = new Date().toLocaleDateString('en-US');
    const now = Date.parse(today);


    return (
        <ThemeProvider theme={theme}>
            <Paper style={styles.paperContainer}>
                <CssBaseline />
                <Container component="main" sx={{ justifyContent: "flex-start" }} >
                    <LoggedInNavBar />
                    <Grid container direction="row" alignItems="center" width="100%" sx={{ justifyContent: "flex-start" }}>
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
                                fontFamily: 'Baloo-Bhaina-2',
                            }}>My Bookings</Typography>
                            <Box sx={{
                                marginTop: "3%"
                            }}>

                                <Typography bgcolor="#475718" color="white" sx={{
                                    padding: 2,
                                    fontSize: 20,
                                    fontWeight: 600,
                                    fontFamily: 'Baloo-Bhaina-2',
                                }}>Current Bookings</Typography>

                                <List sx={{
                                    width: '100%',
                                }}>
                                    <Box>
                                        {

                                            reservedRooms.map(room => {
                                                for (let i = 0; i < reservations.length; i++) {
                                                    if (room.id === reservations[i].roomId && now < Date.parse(reservations[i].check_in)) {
                                                        let checkInDateObj = new Date(reservations[i].check_in);
                                                        let checkOutDateObj = new Date(reservations[i].check_out)
                                                        let checkIn = checkInDateObj.getMonth() + 1 + "/" + checkInDateObj.getDate() + "/" + checkInDateObj.getFullYear();
                                                        let checkOut = checkOutDateObj.getMonth() + 1 + "/" + checkOutDateObj.getDate() + "/" + checkOutDateObj.getFullYear();
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
                                                                    numGuest={reservations[i].numGuest}
                                                                    roomInfo={room.roomInfo}
                                                                    amenities={room.amenities}
                                                                    roomId={room.id}
                                                                    id = {reservations[i].id}
                                                                />
                                                            </Grid>
                                                        )
                                                    }
                                                }

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
                                    fontWeight: 600,
                                    fontFamily: 'Baloo-Bhaina-2',
                                }}>Past Bookings</Typography>

                                <List sx={{
                                    width: '100%',
                                }}>
                                    <Box>
                                        {

                                            reservedRooms.map(room => {
                                                for (let i = 0; i < reservations.length; i++) {
                                                    if (room.id === reservations[i].roomId && (now > Date.parse(reservations[i].check_in) || reservations[i].check_in === null)) {
                                                        let checkInDateObj = new Date(reservations[i].check_in);
                                                        let checkOutDateObj = new Date(reservations[i].check_out)
                                                        let checkIn = checkInDateObj.getMonth() + 1 + "/" + checkInDateObj.getDate() + "/" + checkInDateObj.getFullYear();
                                                        let checkOut = checkOutDateObj.getMonth() + 1 + "/" + checkOutDateObj.getDate() + "/" + checkOutDateObj.getFullYear();
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
                                                                    numGuest={reservations[i].numGuest}
                                                                    roomInfo={room.roomInfo}
                                                                    amenities={room.amenities}
                                                                    roomId={room.id}
                                                                />
                                                            </Grid>
                                                        )
                                                    }
                                                }

                                            })
                                        }
                                    </Box>
                                </List>
                            </Box>
                        </List>

                    </Grid>
                </Container>
            </Paper>
        </ThemeProvider>
    )
}