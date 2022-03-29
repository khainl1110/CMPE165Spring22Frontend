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

import ReservationCard from "./ReservationCard";

export default function MyAccount() {
    const [rooms, setRooms] = useState([]);
    // const [reservations, setReservations] = useState([]);
    const [email, setEmail] = useState('');
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
                setEmail(data.email);
                setUser(data);
            })
            .catch(e => {
                console.log('error' + e);
            })
    })

    // useEffect(() => {
    //     fetch(backend_url + "/reservation", { method: 'GET',
    //     headers: {
    //         "Access-Control-Allow-Origin": "*"
    //     }
    // })
    //         .then(response => response.json())
    //         .then(data => {
    //             setReservations(data);
    //             console.log(data);
    //         })
    //         .catch(e => {
    //             console.log('error' + e);
    //         })
    // })

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

    let reservedRoom = [];

    for(let i = 0; i < rooms.length; i++) {
        if(rooms[i].booked === true) {
            reservedRoom.push(rooms[i]);
        }
    }

    const checkIn = "3/29/2022";
    const checkOut = "3/31/2022";

    
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
                            marginLeft: '5%'
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
                                    fontWeight: 600
                                }}>Current Bookings</Typography>
                                
                                <List sx={{
                                    width: '100%',
                                    maxWidth: '350',
                                    
                                }}>  
                                    <Box>
                                        {
                                            reservedRoom.map(room => {
                                                return(
                                                    <Grid container sx={{
                                                        padding: 1,
                                                        border: 1
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
                            
                                <Typography bgcolor="green" color="white">Past Bookings</Typography>
                                
                            
                            </Box>
                        </List>
                        
                    </Grid>
                </Container>
            </Paper>
        </ThemeProvider>
    )
}