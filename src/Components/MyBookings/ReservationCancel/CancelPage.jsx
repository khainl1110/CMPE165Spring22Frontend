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
import NavBar from "../../NavBar/NavBar.jsx";
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
    },

    imageContainer: {
        backgroundSize: 'cover',
        position: 'relative',
        height: '23vh',
        width: '19vw',
    }
};

export default function CancelPage(props) {
    const location = useLocation();

    let [freeCancel, setFreeCancel] = useState(false);
    let [checked1, setChecked1] = React.useState(false);
    let [checked2, setChecked2] = React.useState(false);
    let [checked3, setChecked3] = React.useState(false);

    const email = localStorage.getItem('email');
    const [user, setUser] = React.useState();
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    useEffect(() => {
        if (email !== '') {
            setIsLoggedIn(true);
            fetch(backend_url + "/users/" + email, { method: 'GET' })
                .then(response => response.json())
                .then(data => {
                    setUser(data);
                })
                .catch(e => {
                    console.log('error' + e);
                })
        }
    }, [])

    var name = location.state.hotelName;
    var img = location.state.image;
    var desc = location.state.description;
    var amenities = location.state.amenities;
    var roomInfo = location.state.roomInfo;
    var guests = location.state.numGuest;
    var checkIn = location.state.checkIn;
    var checkOut = location.state.checkOut;
    var id = location.state.id;

    const current = new Date();
    const today = `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}`;
    const diff = differenceInCalendarDays(new Date(checkIn), new Date(today));
    const priceDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));

    var price = location.state.price;
    console.log(price);
    var fullPrice = priceDays * location.state.price;
    var cancelPrice = priceDays * 20;

    var points = fullPrice / 2.0;
    console.log("TOTAL POINTS FROM RESERVATION: " + points);
    console.log("FULL PRICE: " + fullPrice);
    console.log("location price: " + price);

    const freeText = "You qualify for free cancellation!";
    const paidText = "Sorry, you don’t qualify for a free cancellation! You’ll be charged $" + cancelPrice + " to the card used in making this reservation.";

    useEffect(() => {
        console.log(location.state);
        console.log(location.state.checkOut);
        console.log(today);
        console.log(diff);
        console.log(id);
    }, [])

    useEffect(() => {
        if (diff >= 7) {
            setFreeCancel(true);
        }
        console.log(freeCancel);
        price = price * diff;
    }, [diff])


    const onClickHandle = (event) => {
        let newPoints = 0
        if (isLoggedIn)
            // only calculate points when user is logged in
            // prevent negative points in case user.points is less than points
            newPoints = points > user.points ? 0 : user.points - points

        if (!freeCancel) {
            var confText = "Successfully canceled! Your card on file has been charged with the cancellation fee of $" + cancelPrice + ".";
        }
        else {
            var confText = "Successfully canceled!";
        }

        if (checked1 && checked2 && checked3) {
            fetch(backend_url + "/reservation/" + id, {
                method: 'DELETE',
            }).then(
                alert(confText)
            )

            if (isLoggedIn) {

                let finalPointCount = newPoints;

                fetch(backend_url + "/reservation/find?userEmail=" + user.email, {
                    method: 'GET',
                }).then(response => response.json())
                    .then(response => {
                        // If user's reservations = 0 reservations, their total points must equal 0.
                        if (response.length === 0) {
                            finalPointCount = 0;
                            console.log('NO MORE RESERVATIONS');
                        }
                        console.log('length: ' + response.length);
                    })
                    .catch(e => {
                        console.log('error' + e);
                    })

                const updatedUserData = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    password: user.password,
                    points: finalPointCount,
                    paymentId: user.paymentId,
                }

                fetch(backend_url + "/users", {
                    method: 'PUT',
                    body: JSON.stringify(updatedUserData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(
                    console.log('Updated user points:' + user.points + ' --> ' + (points))
                )
                navigateToMyBookings();
            } else {
                navigateToCheckReservation();
            }

        }
        else {
            alert("Please accept all the agreements before proceeding.")
        }
    }

    const onCheck1 = (event) => {
        setChecked1(event.target.checked);
    }

    const onCheck2 = (event) => {
        setChecked2(event.target.checked);
    }

    const onCheck3 = (event) => {
        setChecked3(event.target.checked);
    }

    const navigate = useNavigate();

    const navigateToMyBookings = (e) => {
        navigate('/myBookings');
    }

    const navigateToCheckReservation = (e) => {
        navigate('/checkReservation');
    }

    return (
        <ThemeProvider theme={theme}>
            <Paper style={styles.paperContainer} sx={{ boxShadow: '0' }}>
                <Container component="main" justifyContent="left" position="absolute">
                    <CssBaseline />
                    {isLoggedIn &&
                        <div>
                            <LoggedInNavBar />
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center" width="100%" sx={{ marginLeft: '-1%', marginTop: '8%', }}>
                                <Grid container direction="row">
                                    <Grid item xs={0}>
                                        <IconButton onClick={navigateToMyBookings}>
                                            <ArrowBackIcon />
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={0}>
                                        <Typography sx={{
                                            fontWeight: 700,
                                            fontSize: '14px',
                                            color: '#424242',
                                            marginTop: '6%'
                                        }}>
                                            Back to My Bookings
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    }
                    {!isLoggedIn &&
                        <div>
                            <NavBar />
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center" width="100%" sx={{ marginLeft: '-1%', marginTop: '8%', }}>
                                <Grid item xs={0}>
                                    <IconButton onClick={navigateToCheckReservation}>
                                        <ArrowBackIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={0}>
                                    <Typography sx={{
                                        fontWeight: 700,
                                        fontSize: '14px',
                                        color: '#424242'
                                    }}>
                                        Back to Check My Reservation
                                    </Typography>
                                </Grid>
                            </Grid>
                        </div>

                    }
                    <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" width="100%" >
                        <Grid item xs={0}>
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center" width="100%" sx={{ marginTop: '2%', marginBottom: '4%', }}>
                                <Typography sx={{
                                    fontWeight: 600,
                                    fontSize: '19px',
                                    color: '#424242'
                                }}>
                                    Cancel Your Reservation:
                                </Typography>
                                <Typography sx={{
                                    fontWeight: 400,
                                    fontSize: '19px',
                                    color: '#9BB40D',
                                    marginLeft: '10px',
                                    textDecorationLine: 'underline',
                                }}>
                                    {name}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid item xs={0}>
                            <Grid container direction="row" justifyContent="left" alignItems="center" spacing={0} sx={{ position: "static", marginTop: '0%', backgroundColor: '#e6edea', borderRadius: 2, }}>
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
                                                fontWeight: 600,
                                                fontSize: '16px',
                                                color: '#424242',
                                                paddingTop: '10px',
                                            }}>
                                                {roomInfo}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={0}>
                                            <Typography variant="h2" sx={{
                                                fontWeight: 400,
                                                fontSize: '14px',
                                                color: '#606060',
                                                marginTop: '2%'
                                            }}>
                                                {location.state.location}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={0}>
                                            <Typography variant="h2" sx={{
                                                fontWeight: 400,
                                                fontSize: '14px',
                                                color: '#606060',
                                                marginTop: '2%'
                                            }}>
                                                {amenities}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={0}>
                                            <Typography variant="h2" sx={{
                                                fontWeight: 400,
                                                fontSize: '14px',
                                                color: '#606060',
                                                marginTop: '2%'
                                            }}>
                                                Description: {desc}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={0}>
                                            <Grid container direction="row" justifyContent="left" alignItems="center" spacing={1.5} sx={{ position: "static", marginTop: '8%', }}>
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
                                                                {checkIn}
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
                                                                {checkOut}
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
                                                                {guests}
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
                                                        $ {fullPrice}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Typography variant="h2" sx={{
                                                fontWeight: 400,
                                                fontSize: '14px',
                                                color: '#606060',
                                            }}>
                                                for {priceDays} nights
                                            </Typography>
                                        </Grid>

                                    </Grid>

                                </Grid>
                            </Grid>


                        </Grid>
                        <Grid item xs={0}>
                            <Typography sx={{
                                fontWeight: 600,
                                fontSize: '14px',
                                color: '#373737',
                                marginLeft: '2%',
                                marginTop: '4%',
                                width: '65%'
                            }}>
                                Booking cancellations are free until 1 week before the check-in date of your reservation. Cancellations within 1-week of your check-in date will result in a cancellation fee of $20 per day charged to the card used to make this reservation. We are unable to refund any payment for no-shows or early checkout.
                            </Typography>
                            <Typography sx={{
                                fontWeight: 600,
                                fontSize: '14px',
                                color: '#373737',
                                marginTop: '1%',
                                marginLeft: '2%',
                                marginBottom: '1%',
                            }}>
                                By booking with LikeHome.com, you agreed to the terms and conditions of our cancellation policy.
                            </Typography>
                        </Grid>

                        <Grid item xs={0}>
                            <Grid container direction="row" justifyContent="left" alignItems="center" spacing={2} sx={{ position: "static", marginTop: "1%", }}>
                                <Grid item xs={0}>
                                    <Typography sx={{
                                        fontWeight: 600,
                                        fontSize: '15px',
                                        color: '#424242',
                                    }}>
                                        Today's Date:
                                    </Typography>
                                </Grid>
                                <Grid item xs={0}>
                                    <Typography sx={{
                                        fontSize: '15px',
                                        color: '#424242',
                                    }}>
                                        {today}
                                    </Typography>
                                </Grid>
                                <Grid item xs={0}>
                                    <Typography sx={{
                                        fontWeight: 600,
                                        fontSize: '15px',
                                        color: '#424242',
                                    }}>
                                        Your Check-In Date:
                                    </Typography>
                                </Grid>
                                <Grid item xs={0}>
                                    <Typography sx={{
                                        fontSize: '15px',
                                        color: '#424242',
                                    }}>
                                        {checkIn}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={0}>
                            <Typography sx={{
                                fontWeight: 600,
                                fontSize: '15px',
                                color: '#424242',
                                marginTop: '4%',
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
                            <Grid container direction="row" justifyContent="left" alignItems="center" spacing={1} sx={{ position: "static", marginTop: "2%", }}>
                                <Grid item xs={0}>
                                    <Checkbox onChange={onCheck1} size="small" />
                                </Grid>

                                <Grid item xs={0}>
                                    <Typography sx={{
                                        fontWeight: 400,
                                        fontSize: '13px',
                                        color: '#424242',
                                        marginTop: '0%',
                                    }}>
                                        I have read and agreed to the terms and conditions of LikeHome.com.
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container direction="row" justifyContent="left" alignItems="center" spacing={1} sx={{ position: "static", marginTop: "-2%", }}>
                                <Grid item xs={0}>
                                    <Checkbox onChange={onCheck2} size="small" />
                                </Grid>

                                <Grid item xs={0}>
                                    <Typography sx={{
                                        fontWeight: 400,
                                        fontSize: '13px',
                                        color: '#424242',
                                        marginTop: '0%',
                                    }}>
                                        I have read and agreed to LikeHome.com’s reservation cancellation policy.
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container direction="row" justifyContent="left" alignItems="center" spacing={1} sx={{ position: "static", marginTop: "-2%", }}>
                                <Grid item xs={0}>
                                    <Checkbox onChange={onCheck3} size="small" />
                                </Grid>

                                <Grid item xs={0}>
                                    <Typography sx={{
                                        fontWeight: 400,
                                        fontSize: '13px',
                                        color: '#424242',
                                        marginTop: '0%',
                                    }}>
                                        I recognize that by cancelling this reservation, it cannot be recovered and I will have to create a new reservation if needed.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={0}>
                            <Button variant="contained" onClick={onClickHandle} sx={{ marginTop: '20%', marginBottom: '10%', backgroundColor: '#9BB40D' }}>
                                Cancel Reservation
                            </Button>
                        </Grid>


                    </Grid>
                </Container>
            </Paper>
        </ThemeProvider >
    )
}