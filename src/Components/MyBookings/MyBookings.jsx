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

    const theme = createTheme();

    const styles = {
        paperContainer: {
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '100%',
          minHeight: '750px',
          width: '100%',
        }
      };


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
    })

    useEffect(() => {
        fetch(backend_url + "/reservation", { method: 'GET'})
            .then(response => response.json())
            .then(data => {
                setReservations(data);
            })
            .catch(e => {
                console.log('error' + e);
            })
    })

    useEffect(() => {
        fetch(backend_url + "/room", { method: 'GET'})
        .then(response => response.json())
        .then(data => {
            setRooms(data);
        })
        .catch(e => {
            console.log('error' + e);
        })
    })

    // change the some values of isBooked from false to true
    // after reservation start date and expired date come out,
    // we can change some code.
    let isBookedRooms = [];
    
    for(let i = 0; i < rooms.length; i++) {
        if(rooms[i].booked === true) {
            isBookedRooms.push(rooms[i]);
        }
    }

    let roomId = [];
    for(let i = 0; i < reservations.length; i++) {
        if(reservations[i].userEmail === user.email) {
            roomId.push(reservations[i].roomId);
        }
    }
    
    let reservedRooms = [];

    for(let i = 0; i < roomId.length; i++) {
        for(let j = 0; j < isBookedRooms.length; j++) {
            if(roomId[i] === isBookedRooms[j].id)
            {
                reservedRooms.push(isBookedRooms[j]);
            }
        }
    }

    // instant value for demo
    const checkIn = "3/29/2022";
    const checkOut = "3/31/2022";
    const pastCheckIn = "2/18/2022";
    const pastCheckOut = "2/19/2022";
    
    return (
        <ThemeProvider theme={theme}>
            <Paper style={styles.paperContainer}>
                <CssBaseline />
                <Container component="main" justifyContent="flex-start">
                    <LoggedInNavBar />
                    <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                        <List sx={{
                            width: '80%',
                            maxWidth: '350',
                            marginTop: '15%',
                            marginLeft: '5%',
                            marginBottom: "10%"
                        }}>
                            <Typography sx={{
                                fontSize: 33,
                                fontWeight: 600,

                            }}>My Bookings</Typography>
                            <Box sx={{
                                marginTop: "3%"
                            }}>
                            
                                <Typography bgcolor="green" color="white" sx={{
                                    padding: 3,
                                    fontSize: 25,
                                    fontWeight: 800
                                }}>Current Bookings</Typography>
                                
                                <List sx={{
                                    width: '100%',
                                    maxWidth: '350',
                                    
                                }}>  
                                    <Box>
                                        {
                                            reservedRooms.map(room => {
                                                return(
                                                    <Grid container sx={{
                                                        padding: 1,
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
                            
                                <Typography bgcolor="green" color="white" sx={{
                                    padding: 3,
                                    fontSize: 25,
                                    fontWeight: 800
                                }}>Past Bookings</Typography>     

                                <List sx={{
                                    width: '100%',
                                    maxWidth: '350',
                                    
                                }}>  
                                    <Box>
                                        {
                                            reservedRooms.map(room => {
                                                return(
                                                    <Grid container sx={{
                                                        padding: 1,
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
            </Paper>
        </ThemeProvider>
    )
}