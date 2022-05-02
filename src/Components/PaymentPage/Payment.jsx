import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import style from '../PaymentPage/Payment.module.css';
import { MenuItem, Button, FormControl, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { Paper } from '@mui/material';
import NavBar from '../NavBar/NavBar.jsx';
import LoggedInNavBar from '../NavBar/LoggedInNavBar';
import { backend_url } from "../../links";
import Grid from '@mui/material/Grid';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function Payment() {
    const email = localStorage.getItem('email');
    const [user, setUser] = React.useState();
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const roomObj = useLocation();
    const roomID = roomObj.state.id;
    const differenceInTime = roomObj.state.checkout.getTime() - roomObj.state.checkin.getTime();
    const days = differenceInTime / (1000 * 3600 * 24);
    const totalPrice = days * roomObj.state.price;
    const [point, setPoint] = React.useState();
    const [usePoints, setUsePoints] = React.useState(0);

    const navigate = useNavigate();

    const navigateToHotels = (e) => {
        navigate('/hotel');
    }

    useEffect(() => {
        if (email !== '') {
            setIsLoggedIn(true);
            fetch(backend_url + "/users/" + email, { method: 'GET' })
                .then(response => response.json())
                .then(data => {
                    setUser(data);
                    setPoint(data.points);
                })
                .catch(e => {
                    console.log('error' + e);
                })
        }
    }, [])

    const changePoints = (event) => {
        if (event.target.value <= point) {
            setUsePoints(event.target.value);
        }
        else {
            setUsePoints(point);
            event.target.value = point;
        }
        console.log(usePoints);
    }

    const confirmReservation = async (e) => {
        const priceReduc = usePoints / 10;

        e.preventDefault();
        const data = new FormData(e.currentTarget);

        let check = await checkOverlapReservation()
        //console.log("check " + check)
        if (check == true) {
            alert("Users may not make multiple reservations that fall within their current reservation dates.")
            return
        }

        const paymentData = {
            name: data.get('firstName') + " " + data.get('lastName'),
            number: data.get('cardNumber'),
            code: data.get('cvcCode'),
            expiration: data.get('exp'),
        }
        console.log(paymentData);

        fetch(backend_url + "/payment", {
            method: 'POST',
            body: JSON.stringify(paymentData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                if (data.status !== 200)
                    alert("Having error")
                else {
                    console.log("Successfully payed!");
                    return data;
                }
            })
            .then(response => response.json())
            .then((res) => {
                const reservationData = {
                    firstName: data.get('firstName'),
                    lastName: data.get('lastName'),
                    pointsRedeemed: usePoints,
                    userEmail: data.get('email'),
                    roomId: roomID,
                    price: totalPrice,
                    check_in: roomObj.state.checkin,
                    check_out: roomObj.state.checkout,
                    numGuest: roomObj.state.numGuests,
                    paymentID: res.id,
                }
                fetch(backend_url + "/reservation", {
                    method: 'POST',
                    body: JSON.stringify(reservationData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(response => response.json()).then((res) => {
                    alert("Successfully booked! Your reservation id is: " + res.id + ". You have used " + usePoints + " points, which means you saved $" + priceReduc + ". The total price you paid for this reservation is $" + (totalPrice - priceReduc) + ".");
                })
                console.log(reservationData);

                // If user is logged in, add points to their account.
                // Each 2$ spent is 1 point earned. 
                // 50 points = 5$ is redeemable.
                if (isLoggedIn && user && priceReduc == 0) {
                    const updatedUserData = {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        password: user.password,
                        points: user.points + (totalPrice / 2.0),
                        paymentId: user.paymentId,
                    }

                    fetch(backend_url + "/users", {
                        method: 'PUT',
                        body: JSON.stringify(updatedUserData),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(
                        console.log('Updated user points:' + user.points + ' --> ' + (totalPrice / 2.0))
                    )
                }
                if (isLoggedIn && user && priceReduc != 0) {
                    const updatedUserData = {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        password: user.password,
                        points: user.points - usePoints + (totalPrice / 2.0),
                        paymentId: user.paymentId,
                    }

                    fetch(backend_url + "/users", {
                        method: 'PUT',
                        body: JSON.stringify(updatedUserData),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(
                        console.log('Updated user points:' + user.points - ' --> ' + usePoints)
                    )
                }

                navigateToHotels();
            })

        // fetch(backend_url + "/room/" + roomId, {
        //     method: 'PUT',
        //     body: JSON.stringify({
        //         hotelName: props.room.hotelName,
        //         image: props.room.image,
        //         location: props.room.location,
        //         rating: props.room.rating,
        //         description: props.room.description,
        //         price: props.room.price,
        //         booked: true,
        //     }),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        //     .then(response => response.json())
    }

    const checkOverlapReservation = async () => {
        // first get the reservation from this user
        // url: localhost:8080/reservation/find?userEmail=[email]
        let userReservation = await fetch(backend_url + "/reservation/find?userEmail=" + email, { method: 'GET' })
            .then(data => data.json())
            .then(data => { return data })

        /*
            Loop through each reservation and check whether it overlaps or not
            Overlap: max start time < min end time of 2 reservations
        */
        let checkinForm = new Date(roomObj.state.checkin)
        let checkoutForm = new Date(roomObj.state.checkout)

        // use traditional for loop so that we can return
        // if we use forEach, it will just loop everytime even with break
        for (let i = 0; i < userReservation.length; i++) {
            let d = userReservation[i];
            var checkin = new Date(d.check_in)
            var checkout = new Date(d.check_out)

            var max_start = Math.max(checkinForm.getTime(), checkin.getTime())
            var min_end = Math.min(checkoutForm.getTime(), checkout.getTime())

            if (max_start <= min_end) {
                //console.log("Overlap")
                return true;
            }

        }
        return false
    }

    return (
        <div className={style.main}>
            <Grid container direction="column" justifyContent="space-evenly" spacing={5} marginTop="0%">
                <Grid item xs={12}>
                    {isLoggedIn &&
                        <LoggedInNavBar />
                    }
                    {!isLoggedIn &&
                        <NavBar />
                    }
                </Grid>
                <Grid item xs={12}><YourRoomReservation /></Grid>
                <Grid item xs={12} align="center" ><HotelRoomDetails /></Grid>
                {isLoggedIn &&
                    <Grid item sx={12}>
                        <div className={style.RedeemPoints}>
                            <p className={style.p}>Redeem Points</p>
                            <Grid container spacing={0}>
                                <Grid item xs={0}>
                                    <TextFieldComp className={style.tf} id="outlined-disabled" label="Points to Redeem" name="points" onChange={changePoints} value={usePoints} />
                                </Grid>
                                <Typography sx={{
                                    fontWeight: 500,
                                    fontSize: '16px',
                                    color: '#000000',
                                    marginTop: '2.5%',
                                    marginLeft: '5%'
                                }}>
                                    <b>Points Available: </b> {point}
                                </Typography>
                            </Grid>
                        </div>
                    </Grid>
                }
                <Box component="form" onSubmit={confirmReservation} sx={{ marginLeft: '10%' }}>
                    <FormControl component="fieldset" variant="standard">
                        <Grid item><UserInfo user={user} /></Grid>
                        <Grid item><PaymentDetails /></Grid>
                        <Grid item ><CancelationPolicy /></Grid>
                        <Grid item >
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 2, mb: 0, backgroundColor: '#9BB40D', fontWeight: '500', marginTop: '4%' }}
                            >
                                Confirm Reservation
                            </Button>
                        </Grid>
                    </FormControl>
                </Box>
            </Grid>
        </div>
    )
}

const YourRoomReservation = () => (
    <>
        <p style={{ fontWeight: 600, marginLeft: '6%', marginBottom: '-17%' }}>Create Your Reservation: </p>
        {/* "font-family": 'Gill Sans' */}
    </>
)
const TextFieldComp = ({ name, type, className, id, label, defaultValue = "", onChange, value }) => {
    return (

        <>
            <TextField
                variant="standard"
                required
                onChange={onChange}
                type={type}
                value={value}
                className={className}
                id={id}
                name={name}
                label={label}
                defaultValue={defaultValue}
                size="small"
                margin="dense"
                style={{ "font-family": "Gill Sans" }}
            />

        </>
    );
}

const UserInfo = ({ className, user }) => {
    useEffect(() => {
        if (user !== undefined) {
            updateName(user.firstName);
            updatelName(user.lastName);
            updateEmail(user.email);
        }
    }, [user])

    const [name, updateName] = React.useState('');
    const handleName = (event) => {
        updateName(event.target.value);
    }

    const [email, updateEmail] = React.useState('');
    const handleEmail = (event) => {
        updateEmail(event.target.value);
    }
    const [lName, updatelName] = React.useState('');
    const handlelName = (event) => {
        updatelName(event.target.value);
    }
    const [phone, updatePhone] = React.useState();
    const handlePhone = (event) => {
        updatePhone(event.target.value);
    }
    className = { className }
    return (
        <div className={style.YourInfo}>
            <p className={style.p}>Your Info</p>
            <Grid container spacing={0}>
                <Grid item xs={4}><TextFieldComp className={style.tf} id="outlined-disabled" label="First Name" name="firstName" onChange={handleName} value={name} /></Grid>
                <Grid item xs={4}><TextFieldComp className={style.tf} id="outlined-disabled" label="Last Name" name="lastName" onChange={handlelName} value={lName} /></Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}><TextFieldComp className={style.tf} id="email" name="email" label="Email" type="email" onChange={handleEmail} value={email} /></Grid>
                <Grid item xs={4}><TextFieldComp className={style.tf} id="outlined-disabled" label="Phone" name="phone" onChange={handlePhone} /></Grid>
            </Grid>
        </div>
    )
}

const ModeOfPayment = () => {

    const ModeOfPayments = [
        "Credit Card",
        "Debit Card"
    ];

    const [payment, setPayment] = React.useState(ModeOfPayments[0]);

    const handleChange = (event) => {
        setPayment(event.target.value);
    }

    return (<>
        <TextField
            variant="standard"
            id="outlined-select-currency"
            select
            value={payment}
            onChange={handleChange}
            className={style.mop}
            size="small"
            margin="dense"
        >
            {
                ModeOfPayments.map((x) => (
                    <MenuItem value={x}>{x}</MenuItem>
                ))
            }
        </TextField>
    </>);
}

const PaymentDetails = () => {
    return (
        <div className={style.PaymentDetails}>
            <p>Payment Details</p>
            <Grid container spacing={1} >
                <Grid item xs={6}><ModeOfPayment /></Grid>
                <Grid item xs={6} />
                <Grid item xs={4}><TextFieldComp className={style.tf} id="outlined-disabled" label="Card Number" name="cardNumber" /></Grid>
                <Grid item xs={3}><TextFieldComp password className={style.tf} id="outlined-disabled" label="CVC" type="password" name="cvcCode" /></Grid>
                <Grid item xs={3}><MonthAndYear /></Grid>

                <Grid item xs={4}><TextFieldComp className={style.tf} id="outlined-disabled" label="Billing Address" name="billingAddress" /> </Grid>
                <Grid item xs={3}><TextFieldComp className={style.tf} id="outlined-disabled" label="City" name="city" /></Grid>

                <Grid item xs={2}><StateSelect /></Grid>
                <Grid item xs={4}><TextFieldComp className={style.tf} id="outlined-disabled" label="Country" name="country" /></Grid>
                <Grid item xs={3}><TextFieldComp className={style.tf} id="outlined-disabled" label="Zip Code" name="zipCode" /></Grid>
            </Grid>
        </div>
    )
}

const MonthAndYear = ({ className }) => {
    const [value, setValue] = React.useState(new Date());
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                className={style.date}
                views={['year', 'month']}
                label="Expiration Date"
                minDate={new Date('2022-01-01')}
                maxDate={new Date('2032-06-01')}
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={(params) => <TextField className={style.tf} {...params} name='exp' value={value} helperText={null} />}
            />
        </LocalizationProvider>
    )
}

const GreenPrompt = () => {

    return (
        <div className={style.greenPrompt}>
            <p>Wait! By signing up for a LikeHome account, you could earn 600 points for this reservation to redeem and save on future trips! Learn more here.</p>
        </div>
    )
}

const HotelRoomDetails = () => {
    const roomObj = useLocation();

    const differenceInTime = roomObj.state.checkout.getTime() - roomObj.state.checkin.getTime();
    const days = differenceInTime / (1000 * 3600 * 24);
    const totalPrice = days * roomObj.state.price;

    return (
        <div className={style.temp}>
            <Grid container spacing={2} sx={{ backgroundColor: '#fbf9f9', width: '80%' }}>
                <Grid item xs={5}>
                    <Paper
                        className={style.img}
                        sx={{
                            backgroundImage: `url(${roomObj.state.img})`,
                            height: '26vh',
                            width: '23vw',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center center',
                        }}>
                    </Paper>
                </Grid>
                <Grid item xs={5} container direction="column" align="left">
                    <Grid item xs style={{ "font-weight": "600", "font-size": "18px", "margin-bottom": "0%" }}>
                        {roomObj.state.name}
                    </Grid>
                    <Grid item xs style={{ "font-size": "1em" }}>
                        {roomObj.state.location}
                    </Grid>
                    <Grid item xs>
                        {roomObj.state.desc}
                    </Grid>
                    <Grid item xs>
                        {roomObj.state.roomInfo}
                    </Grid>
                    <Grid item container spacing={2}>
                        <Grid item xs={4}>
                            Checkin
                        </Grid>
                        <Grid item xs={4}>
                            Checkout
                        </Grid>
                        <Grid item xs={4}>
                            Guests
                        </Grid>
                    </Grid>
                    <Grid item container spacing={2}>
                        <Grid item xs={4}>
                            {roomObj.state.checkin.getMonth() + 1}/{roomObj.state.checkin.getDate()}/{roomObj.state.checkin.getFullYear()}
                        </Grid>
                        <Grid item xs={4}>
                            {roomObj.state.checkout.getMonth() + 1}/{roomObj.state.checkout.getDate()}/{roomObj.state.checkout.getFullYear()}
                        </Grid>
                        <Grid item xs={4}>
                            {roomObj.state.numGuests}
                        </Grid>

                    </Grid>
                </Grid>
                <Grid item xs={2} container direction="column">
                    <Grid item style={{ "font-weight": "650", "font-size": "2em" }}>
                        ${totalPrice}
                    </Grid>
                    <Grid item>
                        For {days} nights
                    </Grid>
                </Grid>
            </Grid >
        </div >
    )
}

const RequestForRoom = () => (
    <>
        <Grid container>
            <Grid item xs={12}><h2>Special requests for the hotel</h2></Grid>
            <Grid item xs={12}>
                <TextField
                    id="outlined-multiline-static"
                    label=""
                    multiline
                    rows={4}
                    style={{ "width": "100%", "height": "30%" }}
                />
            </Grid>
        </Grid>
    </>
)


const CancelationPolicy = () => {
    return (
        <div className={style.policy}>
            <h2>Cancellation Policy</h2>
            <p><strong>Please Note:</strong> Booking cancellations are free until 1 week before the check-in date of your reservation. Cancellations within 1-week of your check-in date will result in a cancellation fee of $20 per day charged to the card used to make this reservation. We are unable to refund any payment for no-shows or early checkout.</p>
            <br />
            <p>By booking with LikeHome.com, you agree to the terms and conditions of our cancellation policy.</p>
        </div>
    )
}
const StateSelect = () => {
    const states = [
        {
            "name": "Alabama",
            "abbreviation": "AL"
        },
        {
            "name": "Alaska",
            "abbreviation": "AK"
        },
        {
            "name": "American Samoa",
            "abbreviation": "AS"
        },
        {
            "name": "Arizona",
            "abbreviation": "AZ"
        },
        {
            "name": "Arkansas",
            "abbreviation": "AR"
        },
        {
            "name": "California",
            "abbreviation": "CA"
        },
        {
            "name": "Colorado",
            "abbreviation": "CO"
        },
        {
            "name": "Connecticut",
            "abbreviation": "CT"
        },
        {
            "name": "Delaware",
            "abbreviation": "DE"
        },
        {
            "name": "District Of Columbia",
            "abbreviation": "DC"
        },
        {
            "name": "Federated States Of Micronesia",
            "abbreviation": "FM"
        },
        {
            "name": "Florida",
            "abbreviation": "FL"
        },
        {
            "name": "Georgia",
            "abbreviation": "GA"
        },
        {
            "name": "Guam",
            "abbreviation": "GU"
        },
        {
            "name": "Hawaii",
            "abbreviation": "HI"
        },
        {
            "name": "Idaho",
            "abbreviation": "ID"
        },
        {
            "name": "Illinois",
            "abbreviation": "IL"
        },
        {
            "name": "Indiana",
            "abbreviation": "IN"
        },
        {
            "name": "Iowa",
            "abbreviation": "IA"
        },
        {
            "name": "Kansas",
            "abbreviation": "KS"
        },
        {
            "name": "Kentucky",
            "abbreviation": "KY"
        },
        {
            "name": "Louisiana",
            "abbreviation": "LA"
        },
        {
            "name": "Maine",
            "abbreviation": "ME"
        },
        {
            "name": "Marshall Islands",
            "abbreviation": "MH"
        },
        {
            "name": "Maryland",
            "abbreviation": "MD"
        },
        {
            "name": "Massachusetts",
            "abbreviation": "MA"
        },
        {
            "name": "Michigan",
            "abbreviation": "MI"
        },
        {
            "name": "Minnesota",
            "abbreviation": "MN"
        },
        {
            "name": "Mississippi",
            "abbreviation": "MS"
        },
        {
            "name": "Missouri",
            "abbreviation": "MO"
        },
        {
            "name": "Montana",
            "abbreviation": "MT"
        },
        {
            "name": "Nebraska",
            "abbreviation": "NE"
        },
        {
            "name": "Nevada",
            "abbreviation": "NV"
        },
        {
            "name": "New Hampshire",
            "abbreviation": "NH"
        },
        {
            "name": "New Jersey",
            "abbreviation": "NJ"
        },
        {
            "name": "New Mexico",
            "abbreviation": "NM"
        },
        {
            "name": "New York",
            "abbreviation": "NY"
        },
        {
            "name": "North Carolina",
            "abbreviation": "NC"
        },
        {
            "name": "North Dakota",
            "abbreviation": "ND"
        },
        {
            "name": "Northern Mariana Islands",
            "abbreviation": "MP"
        },
        {
            "name": "Ohio",
            "abbreviation": "OH"
        },
        {
            "name": "Oklahoma",
            "abbreviation": "OK"
        },
        {
            "name": "Oregon",
            "abbreviation": "OR"
        },
        {
            "name": "Palau",
            "abbreviation": "PW"
        },
        {
            "name": "Pennsylvania",
            "abbreviation": "PA"
        },
        {
            "name": "Puerto Rico",
            "abbreviation": "PR"
        },
        {
            "name": "Rhode Island",
            "abbreviation": "RI"
        },
        {
            "name": "South Carolina",
            "abbreviation": "SC"
        },
        {
            "name": "South Dakota",
            "abbreviation": "SD"
        },
        {
            "name": "Tennessee",
            "abbreviation": "TN"
        },
        {
            "name": "Texas",
            "abbreviation": "TX"
        },
        {
            "name": "Utah",
            "abbreviation": "UT"
        },
        {
            "name": "Vermont",
            "abbreviation": "VT"
        },
        {
            "name": "Virgin Islands",
            "abbreviation": "VI"
        },
        {
            "name": "Virginia",
            "abbreviation": "VA"
        },
        {
            "name": "Washington",
            "abbreviation": "WA"
        },
        {
            "name": "West Virginia",
            "abbreviation": "WV"
        },
        {
            "name": "Wisconsin",
            "abbreviation": "WI"
        },
        {
            "name": "Wyoming",
            "abbreviation": "WY"
        }
    ]

    const [payment, setPayment] = React.useState();

    const handleChange = (event) => {
        setPayment(event.target.value);
    }

    return (<>
        <TextField
            variant="standard"
            id="outlined-select-currency"
            select
            value={payment}
            onChange={handleChange}
            className={style.states}
            label="State"
            size="small"

            margin="dense"
        >
            {
                states.map((x) => (
                    <MenuItem value={x.abbreviation}>{x.abbreviation}</MenuItem>
                ))
            }
        </TextField>
    </>);
}