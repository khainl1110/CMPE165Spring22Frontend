import * as React from 'react';
import { Link, Route, Redirect, useNavigate } from "react-router-dom";
import axios from 'axios';
import { backend_url } from "../../links";
import TextField from '@mui/material/TextField';
import style from '../CheckReservation/check.module.css';
import { Grid, Button, Box, Typography, FormControl } from '@mui/material';
import NavBar from '../NavBar/NavBar.jsx';
import ReservationDetail from './ReservationDetails';
import { Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

export default function Check() {
    const [email, setEmail] = React.useState('');
    const [conNum, setConNum] = React.useState();
    const [room, setRoom] = React.useState([]);
    const [success, setSuccess] = React.useState(false);
    const [detail, setDetail] = React.useState();
    const [price, setPrice] = React.useState(0);
    const [numGuest, setNumGuest] = React.useState(0);
    const [checkIn, setCheckIn] = React.useState('');
    const [checkOut, setCheckOut] = React.useState('');

    const theme = createTheme({

    });

    let navigate = useNavigate();

    const today = new Date().toLocaleDateString('en-US');
    const now = Date.parse(today);

    const handleClick = (e) => {
        e.preventDefault();
        fetch(backend_url + "/reservation/" + conNum, { method: 'GET' })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Please double check that you entered correct information');
            })
            .then(data => {

                if (email !== data.userEmail) {
                    throw new Error('Please double check that you entered correct information');
                }

                setPrice(data.price);
                setNumGuest(data.numGuest);
                let checkInDateObj = new Date(data.check_in);
                let checkOutDateObj = new Date(data.check_out);
                let ci = checkInDateObj.getMonth() + 1 + "/" + checkInDateObj.getDate() + "/" + checkInDateObj.getFullYear();
                let co = checkOutDateObj.getMonth() + 1 + "/" + checkOutDateObj.getDate() + "/" + checkOutDateObj.getFullYear();

                setCheckIn(ci);
                setCheckOut(co);

                fetch(backend_url + "/room/" + data.roomId, { method: 'GET' })
                    .then(roomData => roomData.json())
                    .then(roomData => {
                        setRoom(roomData);
                        console.log(roomData);
                        setSuccess(true);
                    })
            })
            .then(data => (setDetail(data)))
            .then(console.log(detail))
            .catch((e) => {
                alert(e);
            })
    }

    return (
        <ThemeProvider theme={theme}>
            <Paper className={style.main}
                sx={{ boxShadow: 0 }}>
                <CssBaseline />
                <NavBar />

                <Typography sx={{ marginTop: '0%' }}>Do not delete</Typography>

                <Typography sx={{
                    fontFamily: 'Baloo-Bhaina-2',
                    fontWeight: 600,
                    fontSize: '25px',
                    color: '#424242',
                    marginTop: '5%',
                    marginLeft: '3%'
                }}>
                    Check Your Reservation:
                </Typography>
                {
                    <Grid container direction="column" justifyContent="space-evenly" spacing={5} >
                        <Grid container direction="row" spacing={5} justifyContent="space-between" alignItems="center" >
                            <Grid item xs={6}>
                                <div className={style.boxy}>
                                    {/* <Box className={style.boxy} component="form" onClick={handleClick}>
                                    <FormControl> */}
                                    <TextField value={email}
                                        onChange={(e) => (setEmail(e.target.value))}
                                        required={true}
                                        type="email" size="small" id="email" label="Email"
                                        sx={{ marginRight: "30px", width: "30%" }}
                                    />
                                    <TextField value={conNum}
                                        onChange={(e) => (setConNum(e.target.value))}
                                        required={true}
                                        size="small" id="conNum" label="Reservation ID"
                                        sx={{ marginRight: "30px", width: "30%" }}
                                    />
                                    <Button
                                        onClick={handleClick}
                                        type="submit"
                                        variant="contained"
                                        sx={{ backgroundColor: '#9BB40D', width: "30%", height: "38px" }}
                                    >
                                        Check Reservation
                                    </Button>
                                    {/* </FormControl>
                            </Box> */}
                                </div>
                            </Grid>
                        </Grid>
                        {success &&
                            <Grid item xs={6}>
                                <Box sx={{ width: '80%', marginLeft: '10%' }}>
                                    <ReservationDetail
                                        hotelName={room.hotelName}
                                        description={room.description}
                                        price={price}
                                        image={room.image}
                                        checkIn={checkIn}
                                        checkOut={checkOut}
                                        firstName="FIRST NAME"
                                        lastName="LAST NAME"
                                        email={email}
                                        numGuest={numGuest}
                                        roomInfo={room.roomInfo}
                                        amenities={room.amenities}
                                        roomId={3}
                                    />
                                </Box>
                            </Grid>}
                    </Grid>
                }
            </Paper>
        </ThemeProvider >
    )
}