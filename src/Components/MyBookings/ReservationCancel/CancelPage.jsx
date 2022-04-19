import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {
    CssBaseline,
    Grid,
    Box,
    Typography,
    Container,
    Paper,
} from '@mui/material/';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

import LoggedInNavBar from '../../NavBar/LoggedInNavBar.jsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
import { backend_url } from "../../../links";

const theme = createTheme({
});

const styles = {
    paperContainer: {
        backgroundSize: 'cover',
        position: 'static',
        width: '100%',
        backgroundColor: '#E5E5E5',
    },

    imageContainer: {
    backgroundSize: 'cover',
    position: 'relative',
    height: '26vh',
    width: '19vw',
    }
};



export default function CancelPage(props) {
    const location = useLocation();

    let [freeCancel, setFreeCancel] = useState(false);

    var name = location.state.hotelName;
    var img = location.state.image;
    var desc = location.state.description;
    var price = location.state.price;
    var locat = "test location";
    var roomInfo = location.state.roomInfo;
    var guests = location.state.numGuest;
    var checkIn= location.state.checkIn;
    var checkOut = location.state.checkOut;

    const freeText = "You qualify for free cancellation!";
    const paidText = "Sorry, you don’t qualify for a free cancellation! You’ll be charged a cancellation fee of $XXX.XX to the card used to make this reservation";

    const current = new Date();
    const today = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;
    const diff = differenceInCalendarDays(new Date(checkOut), new Date(today));

    useEffect(() => {
        console.log(location.state);
        console.log(location.state.checkOut);
        console.log(today);
        
        console.log(diff);
    }, [])

    useEffect(() => {
        if(diff >= 7){
            setFreeCancel(true);
        }
        console.log(freeCancel);
    }, [diff])
    const onClickHandle = (event) => {

    }

    const navigate = useNavigate();

    const navigateToMyBookings = (e) => {
        navigate('/myBookings');
    }

    return (
        <ThemeProvider theme={theme}>
            <Paper style={styles.paperContainer} sx={{boxShadow:'0'}}>
                <Container component="main" justifyContent="left" position="absolute">
                    <CssBaseline />
                    <LoggedInNavBar />
                    <Grid container direction="row" justifyContent="flex-start" alignItems="center" width="100%" sx={{marginTop: '5.7%',}}>
                        <Grid item xs={0}>
                            <IconButton onClick={navigateToMyBookings}>
                            <ArrowBackIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={0}>
                            <Typography sx={{
                                fontFamily: 'Baloo-Bhaina-2',
                                fontWeight: 700,
                                fontSize: '20px',
                                color: '#424242'
                            }}>
                                Back to My Bookings
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" width="100%" >
                        <Grid item xs={0}>
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center" width="100%" sx={{marginTop: '3%', marginBottom: '5%',}}>
                                <Typography sx={{
                                    fontFamily: 'Baloo-Bhaina-2',
                                    fontWeight: 600,
                                    fontSize: '30px',
                                    color: '#424242'
                                }}>
                                    Cancel Your Reservation:
                                </Typography>
                                <Typography sx={{
                                    fontFamily: 'Baloo-Bhaina-2',
                                    fontWeight: 600,
                                    fontSize: '30px',
                                    color: '#424242'
                                }}>
                                    {name}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid item xs={0}>






                        <Grid container direction="row" justifyContent="left" alignItems="center" spacing={0} sx={{ position: "static", marginTop: '0%' }}>
                        <Grid item xs={0}>
                            <Paper style={styles.imageContainer} sx={{ backgroundImage: `url(${img})`, }}>
                            </Paper>
                        </Grid>

                        <Grid item xs={5}>
                            <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={0} sx={{
                            position: "static", marginLeft: '10%', width: '100%'
                            }}>
                            <Grid item xs={0}>
                                <Typography variant="h3" sx={{
                                fontFamily: 'Baloo-Bhaina-2',
                                fontWeight: 600,
                                fontSize: '22px',
                                color: '#424242'
                                }}>
                                {roomInfo}
                                </Typography>
                            </Grid>
                            <Grid item xs={0}>
                                <Typography variant="h2" sx={{
                                fontFamily: 'Baloo-Bhaina-2',
                                fontWeight: 400,
                                fontSize: '18px',
                                color: '#606060',
                                marginTop: '2%'
                                }}>
                                {locat}
                                </Typography>
                            </Grid>
                            <Grid item xs={0}>
                                <Typography variant="h2" sx={{
                                fontFamily: 'Baloo-Bhaina-2',
                                fontWeight: 400,
                                fontSize: '18px',
                                color: '#606060',
                                marginTop: '2%'
                                }}>
                                Description: {desc}
                                </Typography>
                            </Grid>
                            <Grid item xs={0}>
                                <Grid container direction="row" justifyContent="left" alignItems="center" spacing={1.5} sx={{ position: "static", marginTop: '20%', }}>
                                <Grid item xs={0}>
                                    <Grid container direction="column" justifyContent="flex-start" alignItems="center" spacing={0} sx={{ marginLeft: '0%', position: "static" }}>
                                        <Grid item xs={0}>
                                            <Typography sx={{
                                            fontFamily: 'Baloo-Bhaina-2',
                                            fontWeight: 300,
                                            fontSize: '16px',
                                            color: '#646464',
                                            }}>
                                            Check In
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={0}>
                                            <Typography sx={{
                                            fontFamily: 'Baloo-Bhaina-2',
                                            fontWeight: 300,
                                            fontSize: '16px',
                                            color: '#646464',
                                            }}>
                                            {checkIn}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={0}>
                                <Grid container direction="column" justifyContent="flex-start" alignItems="center" spacing={0} sx={{ marginLeft: '0%', position: "static" }}>
                                        <Grid item xs={0}>
                                            <Typography sx={{
                                            fontFamily: 'Baloo-Bhaina-2',
                                            fontWeight: 300,
                                            fontSize: '16px',
                                            color: '#646464',
                                            }}>
                                            Check Out
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={0}>
                                            <Typography sx={{
                                            fontFamily: 'Baloo-Bhaina-2',
                                            fontWeight: 300,
                                            fontSize: '16px',
                                            color: '#646464',
                                            }}>
                                            {checkOut}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={0}>
                                    <Typography sx={{
                                    fontFamily: 'Baloo-Bhaina-2',
                                    fontWeight: 300,
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
                                            fontFamily: 'Baloo-Bhaina-2',
                                            fontWeight: 300,
                                            fontSize: '16px',
                                            color: '#646464',
                                            }}>
                                            Guests
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={0}>
                                            <Typography sx={{
                                            fontFamily: 'Baloo-Bhaina-2',
                                            fontWeight: 300,
                                            fontSize: '16px',
                                            color: '#646464',
                                            }}>
                                            {guests}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                </Grid>
                            </Grid>

                            </Grid>
                        </Grid>

                            <Grid item xs={3}>
                                <Grid container direction="column" justifyContent="right" alignItems="flex-end" spacing={0} sx={{ marginLeft: '0%', position: "static" }}>
                                <Grid item xs={0}>
                                    <Grid container direction="row" justifyContent="left" alignItems="center" spacing={0} sx={{ position: "static", marginTop: "0%", }}>
                                    <Grid item xs={0}>
                                        <Typography variant="h2" sx={{
                                        fontFamily: 'Baloo-Bhaina-2',
                                        fontWeight: 700,
                                        fontSize: '40px',
                                        color: '#606060',
                                        }}>
                                        $
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={0}>
                                        <Typography variant="h2" sx={{
                                        fontFamily: 'Baloo-Bhaina-2',
                                        fontWeight: 700,
                                        fontSize: '40px',
                                        color: '#606060',
                                        }}>
                                        {price}
                                        </Typography>
                                    </Grid>
                                    </Grid>
                                    <Typography variant="h2" sx={{
                                    fontFamily: 'Baloo-Bhaina-2',
                                    fontWeight: 700,
                                    fontSize: '18px',
                                    color: '#606060',
                                    }}>
                                    for N nights
                                    </Typography>
                                </Grid>

                                </Grid>

                            </Grid>
                            </Grid>

                            
                        </Grid>
                        <Grid item xs={0}>
                            <Typography sx={{
                            fontFamily: 'Baloo-Bhaina-2',
                            fontWeight: 500,
                            fontSize: '18px',
                            color: '#373737',
                            marginLeft: '2%',
                            }}>
                                Booking cancellations are free until 1 week before the check-in date of your reservation. Cancellations within 1-week of your check-in date will result in a cancellation fee of $XXX.XX charged to the card used to make this reservation. We are unable to refund any payment for no-shows or early checkout.
                            </Typography>
                            <Typography sx={{
                            fontFamily: 'Baloo-Bhaina-2',
                            fontWeight: 500,
                            fontSize: '18px',
                            color: '#373737',
                            marginTop: '1%',
                            marginLeft: '2%',
                            marginBottom: '3%',
                            }}>
                                By booking with LikeHome.com, you agreed to the terms and conditions of our cancellation policy.
                            </Typography>
                        </Grid>

                        <Grid item xs={0}>
                            <Grid container direction="row" justifyContent="left" alignItems="center" spacing={2} sx={{ position: "static", marginTop: "0%", }}>
                                <Grid item xs={0}>
                                    <Typography sx={{
                                    fontFamily: 'Baloo-Bhaina-2',
                                    fontWeight: 600,
                                    fontSize: '20px',
                                    color: '#424242',
                                    }}>
                                        Today's Date:
                                    </Typography>
                                </Grid>
                                <Grid item xs={0}>
                                    <Typography sx={{
                                    fontFamily: 'Baloo-Bhaina-2',
                                    fontWeight: 600,
                                    fontSize: '20px',
                                    color: '#424242',
                                    }}>
                                        {today}
                                    </Typography>
                                </Grid>
                                <Grid item xs={0}>
                                    <Typography sx={{
                                    fontFamily: 'Baloo-Bhaina-2',
                                    fontWeight: 600,
                                    fontSize: '20px',
                                    color: '#424242',
                                    }}>
                                        Your Check-In Date:
                                    </Typography>
                                </Grid>
                                <Grid item xs={0}>
                                    <Typography sx={{
                                    fontFamily: 'Baloo-Bhaina-2',
                                    fontWeight: 600,
                                    fontSize: '20px',
                                    color: '#424242',
                                    }}>
                                        {checkIn}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={0}>
                            <Typography sx={{
                            fontFamily: 'Baloo-Bhaina-2',
                            fontWeight: 600,
                            fontSize: '20px',
                            color: '#424242',
                            marginTop: '2%',
                            }}>
                            {freeCancel &&
                            freeText
                            }
                            {!freeCancel &&
                            paidText
                            }
                            </Typography>
                        </Grid>

                        <Grid item xs={0}>
                            <Grid container direction="row" justifyContent="left" alignItems="center" spacing={1} sx={{ position: "static", marginTop: "0%", }}>
                                <Grid item xs={0}>
                                    <Checkbox size="small"/>
                                </Grid>

                                <Grid item xs={0}>
                                    <Typography sx={{
                                    fontFamily: 'Baloo-Bhaina-2',
                                    fontWeight: 400,
                                    fontSize: '12px',
                                    color: '#424242',
                                    marginTop: '0%',
                                    }}>
                                        I have read and agree to the terms and conditions of LikeHome.com.
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container direction="row" justifyContent="left" alignItems="center" spacing={1} sx={{ position: "static", marginTop: "0%", }}>
                                <Grid item xs={0}>
                                    <Checkbox size="small"/>
                                </Grid>

                                <Grid item xs={0}>
                                    <Typography sx={{
                                    fontFamily: 'Baloo-Bhaina-2',
                                    fontWeight: 400,
                                    fontSize: '12px',
                                    color: '#424242',
                                    marginTop: '0%',
                                    }}>
                                        I have read and agree to LikeHome.com’s reservation cancellation policy.
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container direction="row" justifyContent="left" alignItems="center" spacing={1} sx={{ position: "static", marginTop: "0%", }}>
                                <Grid item xs={0}>
                                    <Checkbox size="small"/>
                                </Grid>

                                <Grid item xs={0}>
                                    <Typography sx={{
                                    fontFamily: 'Baloo-Bhaina-2',
                                    fontWeight: 400,
                                    fontSize: '12px',
                                    color: '#424242',
                                    marginTop: '0%',
                                    }}>
                                        I recognize that by cancelling this reservation, it cannot be recovered and I will have to create a new reservation if needed.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={0}>
                        <Button variant="contained" onClick={onClickHandle} sx={{ marginTop: '25%', marginBottom: '10%', backgroundColor: '#9BB40D' }}>
                            Cancel Reservation
                        </Button>
                        </Grid>


                    </Grid>
                </Container>
            </Paper>
        </ThemeProvider> 
    )
}