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

export default function MyBookings() {

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

    const email = localStorage.getItem('email');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState();
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

            setIsLoggedIn(true);
        }
        else {
            window.location.replace('/');
        }
    }, [])

    const [rooms, setRooms] = useState([]);
    useEffect(() => {

        fetch(backend_url + "/room", { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                setRooms(data);
            })
            .catch(e => {
                console.log('error' + e);
                window.location.replace("/myBookings");
            })

    }, [])

    const [payment, setPayment] = useState([]);
    useEffect(() => {
        fetch(backend_url + "/payment", { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                setPayment(data);
            })
            .catch(e => {
                console.log('error' + e);
                window.location.replace("/myBookings");
            })
    }, [])

    const [reservations, setReservations] = useState([]);
    useEffect(() => {
        fetch(backend_url + "/reservation", { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                setReservations(data);
            })
            .catch(e => {
                console.log('error' + e);
                window.location.replace("/myBookings");
            })
    }, [])

    let roomIds = [];
    for (let i = 0; i < reservations.length; i++) {
        if (reservations[i].userEmail === email) {
            roomIds.push(reservations[i].roomId);
        }
    }

    let reservedRooms = [];

    for (let i = 0; i < roomIds.length; i++) {
        for (let j = 0; j < rooms.length; j++) {
            if (roomIds[i] === rooms[j].id) {
                reservedRooms.push(rooms[j]);
            }
        }
    }

    // current user's reservations 
    let reservation = []
    for (let i = 0; i < reservations.length; i++) {
        if (reservations[i].userEmail === email) {
            reservation.push(reservations[i]);
        }
    }

    let arr = new Array(reservation.length);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(3);
        arr[i].splice(0, 0, reservation[i]);
        for (let j = 0; j < reservedRooms.length; j++) {
            if (reservedRooms[j].id === reservation[i].roomId) {
                arr[i].splice(1, 0, reservedRooms[j]);
            }
        }
        for (let k = 0; k < payment.length; k++) {
            if (payment[k].id === reservation[i].paymentId) {
                arr[i].splice(2, 0, payment[k]);
            }
        }
    }


    // time now
    const today = new Date().toISOString().substring(0, 10);
    const now = Date.parse(today);

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
                                    fontSize: 22,
                                    fontWeight: 600,
                                    // fontFamily: 'Baloo-Bhaina-2',
                                }}>My Bookings</Typography>
                                <Box sx={{
                                    marginTop: "3%"
                                }}>

                                    <Typography bgcolor="#475718" color="white" sx={{
                                        padding: 2,
                                        fontSize: 18,
                                        fontWeight: 600,
                                        // fontFamily: 'Baloo-Bhaina-2',
                                    }}>Current Bookings</Typography>

                                    <List sx={{
                                        width: '100%',
                                    }}>
                                        <Box>
                                            {
                                                arr.map((arr) => {
                                                    let reserv = arr[0];
                                                    let room = arr[1];
                                                    let pay = arr[2];
                                                    let checkInValue = Date.parse(reserv.check_in.substring(0, 10));
                                                    let diff = checkInValue - now;
                                                    let checkInDateObj = new Date(reserv.check_in);
                                                    let checkOutDateObj = new Date(reserv.check_out)
                                                    let checkIn = checkInDateObj.getMonth() + 1 + "/" + checkInDateObj.getDate() + "/" + checkInDateObj.getFullYear();
                                                    let checkOut = checkOutDateObj.getMonth() + 1 + "/" + checkOutDateObj.getDate() + "/" + checkOutDateObj.getFullYear();

                                                    if (diff >= -86400000) {
                                                        return (
                                                            <Grid container sx={{
                                                                border: 1,
                                                                borderColor: "#eeeeee",
                                                                backgroundColor: "#fafafa"
                                                            }}>
                                                                <ReservationCard
                                                                    hotelName={room.hotelName}
                                                                    description={room.description}
                                                                    price={reserv.price}
                                                                    image={room.image}
                                                                    checkIn={checkIn}
                                                                    checkOut={checkOut}
                                                                    firstName={reserv.firstName}
                                                                    lastName={reserv.lastName}
                                                                    email={reserv.userEmail}
                                                                    guest={room.numGuest}
                                                                    roomInfo={room.roomInfo}
                                                                    amenities={room.amenities}
                                                                    roomId={room.id}
                                                                    cardNumber={pay.number}
                                                                    paymentId={pay.id}
                                                                    reservId={reserv.id}
                                                                    points={reserv.pointsRedeemed}
                                                                    oneDayPrice={room.price}
                                                                    userInfo={user}
                                                                />
                                                            </Grid>
                                                        )
                                                    }
                                                })
                                            }
                                        </Box>
                                    </List>
                                </Box>

                                <Box sx={{
                                    marginTop: "5%",
                                }}>

                                    <Typography bgcolor="#475718" color="white" sx={{
                                        padding: 2,
                                        fontSize: 18,
                                        fontWeight: 600,
                                        // fontFamily: 'Baloo-Bhaina-2',
                                    }}>Past Bookings</Typography>

                                    <List sx={{
                                        width: '100%',
                                    }}>
                                        <Box>
                                            {
                                                arr.map((arr) => {
                                                    let reserv = arr[0];
                                                    let room = arr[1];
                                                    let pay = arr[2];
                                                    let checkInValue = Date.parse(reserv.check_in);
                                                    let diff = checkInValue - now;
                                                    let checkInDateObj = new Date(reserv.check_in);
                                                    let checkOutDateObj = new Date(reserv.check_out)
                                                    let checkIn = checkInDateObj.getMonth() + 1 + "/" + checkInDateObj.getDate() + "/" + checkInDateObj.getFullYear();
                                                    let checkOut = checkOutDateObj.getMonth() + 1 + "/" + checkOutDateObj.getDate() + "/" + checkOutDateObj.getFullYear();

                                                    if (diff < -86400000) {
                                                        return (
                                                            <Grid container sx={{
                                                                border: 1,
                                                                borderColor: "#eeeeee",
                                                                backgroundColor: "#fafafa"
                                                            }}>
                                                                <PastReservationCard
                                                                    hotelName={room.hotelName}
                                                                    description={room.description}
                                                                    price={reserv.price}
                                                                    image={room.image}
                                                                    checkIn={checkIn}
                                                                    checkOut={checkOut}
                                                                    firstName={reserv.firstName}
                                                                    lastName={reserv.lastName}
                                                                    email={reserv.userEmail}
                                                                    guest={reserv.numGuest}
                                                                    roomInfo={room.roomInfo}
                                                                    amenities={room.amenities}
                                                                    roomId={room.id}
                                                                    cardNumber={pay.number}
                                                                    points={reserv.pointsRedeemed}
                                                                />
                                                            </Grid>
                                                        )
                                                    }
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
