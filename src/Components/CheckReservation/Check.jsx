import * as React from 'react';
import { Link, Route, Redirect, useNavigate } from "react-router-dom";
import axios from 'axios';
import { backend_url } from "../../links";
import TextField from '@mui/material/TextField';
import style from '../CheckReservation/check.module.css';
import { Grid, Button, Box } from '@mui/material';
import NavBar from '../NavBar/NavBar.jsx';
import LoggedInNavBar from '../NavBar/LoggedInNavBar';
import FormControl from '@material-ui/core/FormControl';
import ReservationDetail from './ReservationDetails';

export default function Check() {
    const [email, setEmail] = React.useState();
    const [conNum, setConNum] = React.useState();
    const [rooms, setRooms] = React.useState([]);
    const [reservations, setReservations] = React.useState([]);
    const [data, setData]= React.useState();
    const [user, setUser] = React.useState();
    const [success, setSuccess] = React.useState(false);
    const [detail, setDetail] = React.useState();

    let navigate = useNavigate();
    const routeChange=()=> {
        navigate("/login");
    }

    React.useEffect(() => {
        const e = localStorage.getItem('email');
        if (e) {
            console.log(email);
            setEmail(email);
        } else { console.log("NO EMAIL") }
    }, [])

    // const email = localStorage.getItem('email');

    React.useEffect(() => {
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

    React.useEffect(() => {
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

    React.useEffect(() => {
        fetch(backend_url + "/room", { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                setRooms(data);
            })
            .catch(e => {
                console.log('error' + e);
            })
    }, [])

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

    const today = new Date().toLocaleDateString('en-US');
    const now = Date.parse(today);

    const handleClick = (e) => {
        var d;
        e.preventDefault();
        let success = true;
        fetch(backend_url + "/reservation/" + conNum, { method: 'GET' })
            .then(data => data.json())
            .then(data => { return data })
            .then(data => (setDetail(data)))


            console.log(detail);
            setSuccess(true);
        // routeChange();
    }
    



    return (
        <div className={style.main} >
            
            {
            <Grid container direction="column" justifyContent="space-evenly" spacing={5} >
                <Grid item xs={12}>
                    <NavBar />
                </Grid>
                <Grid container direction="row" spacing ={5}justifyContent= "space-between" alignItems="center" >
                    <Grid item xs={4} ><EmailBox email={email} setEmail={setEmail} /></Grid>
                    <Grid item xs={4}><ConfirmBox conNum={conNum} setConNum={setConNum} /></Grid>
                    <Grid item xs={4}>
                        <Button
                            onClick={handleClick}
                            type="submit"
                            variant="contained"
                            sx={{ backgroundColor: '#9BB40D', fontWeight: '500', width: "45%", ml: 5, mt:12 }}
                        >
                            check
                        </Button>
                </Grid>
                </Grid>
                    { success &&
                    <Grid item xs ={12}>
                        <Box>
                            {
                                
                                reservedRooms.map(room => {
                                    for (let i = 0; i < reservations.length; i++) {
                                        if (room.id === reservations[i].roomId && (now > Date.parse(reservations[i].check_in) || reservations[i].check_in === null)) {
                                            let checkInDateObj = new Date(reservations[i].check_in);
                                            let checkOutDateObj = new Date(reservations[i].check_out)
                                            let checkIn = checkInDateObj.getMonth() + 1 + "/" + checkInDateObj.getDate() + "/" + checkInDateObj.getFullYear();
                                            let checkOut = checkOutDateObj.getMonth() + 1 + "/" + checkOutDateObj.getDate() + "/" + checkOutDateObj.getFullYear();
                                            return(
                                                <Grid container sx={{
                                                    border: 1,
                                                    borderColor: "#eeeeee",
                                                    backgroundColor: "#fafafa"
                                                }}>
                                                    {<ReservationDetail
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
                                                    />}
                                                    
                                                </Grid>)
                                            
                                        }
                                    }

                                })
                            }
                                    </Box>
                    </Grid>}

                    
            </Grid>
            }
        </div>
    )  
}

const EmailBox = ({ email, setEmail, onChange }) => {
    return (<div className={style.boxy}>
        <h2 align="center">Your Email</h2>
        <TextField value={email}
            onChange={(e) => (setEmail(e.target.value))}
            type="email" id="email" required label="Email" sx={{ marginLeft: "25%", width: "50%" }} />
    </div>)
}

const ConfirmBox = ({ conNum, setConNum }) => {
    return (<div className={style.boxy}>
        <h2 align="center">Confirmation number</h2>
        <TextField value={conNum}
            onChange={(e) => (setConNum(e.target.value))}
            required id="conNum" label="Confirmaion number" sx={{ marginLeft: "25%", width: "50%" }} />
    </div>)
}