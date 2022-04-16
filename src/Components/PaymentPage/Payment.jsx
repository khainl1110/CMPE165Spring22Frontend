import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import style from '../PaymentPage/Payment.module.css';
import { MenuItem, Button, FormControl } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { Paper } from '@mui/material';
import NavBar from '../NavBar/NavBar.jsx';
import { backend_url } from "../../links";
import Grid from '@mui/material/Grid';
import { useLocation } from 'react-router-dom';

export default function Payment() {
    return (
        <div className={style.main}>
            <Grid container direction="column" justifyContent="space-evenly" spacing={5} >

                <Grid item xs={12}><NavBar /></Grid>
                <Grid item xs={12} />
                <Grid item xs={12}><YourRoomReservation /></Grid>
                <Grid item xs={12} align="center" ><HotelRoomDetails /></Grid>
                <Grid item><GreenPrompt style={{ "padding-top": "0px" }} /></Grid>
                <Box component="form" onSubmit={confirmReservation}>
                    <FormControl component="fieldset" variant="standard">
                        <Grid item><UserInfo /></Grid>
                        <Grid item><PaymentDetails /></Grid>
                        <Grid item align="center"><CancelationPolicy /></Grid>
                        <Grid item >
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 2, mb: 0, backgroundColor: '#9BB40D', fontWeight: '500' }}
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

// This code is under construction.
const confirmReservation = () => {
    alert("RESERVATION CONFIRMED")
    // let userEmail = localStorage.getItem('email');
    // let roomId = props.room.id;
    // const postData = { roomId, userEmail };

    // if (props.room.booked !== true) {
    //     fetch(backend_url + "/reservation", {
    //         method: 'POST',
    //         body: JSON.stringify(postData),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }).then(
    //         alert("Successfully booked!")
    //     )
    //     fetch(backend_url + "/room/" + roomId, {
    //         method: 'PUT',
    //         body: JSON.stringify({
    //             hotelName: props.room.hotelName,
    //             image: props.room.image,
    //             location: props.room.location,
    //             rating: props.room.rating,
    //             description: props.room.description,
    //             price: props.room.price,
    //             booked: true,
    //         }),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then(response => response.json())

    //     window.location.replace("/hotel");
    // }
    // else {
    //     alert("The room is already booked");
    // }
}

const YourRoomReservation = () => (
    <>
        <p style={{ fontWeight: 600 }}>Create Your Reservation: </p>
        {/* "font-family": 'Gill Sans' */}
    </>
)
const TextFieldComp = ({ name, type, className, id, label, defaultValue = "", onChange }) => {
    return (

        <>
            <TextField
                variant="standard"
                required
                onChange={onChange}
                type={type}
                className={className}
                id={id}
                label={label}
                defaultValue={defaultValue}
                size="small"
                margin="dense"
                style={{ "font-family": "Gill Sans" }}
            />

        </>
    );
}

const UserInfo = ({ className }) => {

    const [name, updateName] = React.useState();
    const handleName = (event) => {
        updateName(event.target.value);
    }

    const [email, updateEmail] = React.useState();
    const handleEmail = (event) => {
        updateEmail(event.target.value);
    }
    const [lName, updatelName] = React.useState();
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
                <Grid item xs={4}><TextFieldComp className={style.tf} id="outlined-disabled" label="First Name" onChange={handleName} /></Grid>
                <Grid item xs={4}><TextFieldComp className={style.tf} id="outlined-disabled" label="Last Name" onChange={handlelName} /></Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}><TextFieldComp className={style.tf} id="email" name="email" label="Email" type="email" onChange={handleEmail} /></Grid>
                <Grid item xs={4}><TextFieldComp className={style.tf} id="outlined-disabled" label="Phone" onChange={handlePhone} /></Grid>
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
                <Grid item xs={4}><TextFieldComp className={style.tf} id="outlined-disabled" label="Card Number" /></Grid>
                <Grid item xs={3}><TextFieldComp password className={style.tf} id="outlined-disabled" label="CVV" type="password" /></Grid>
                <Grid item xs={3}><MonthAndYear /></Grid>

                <Grid item xs={4}><TextFieldComp className={style.tf} id="outlined-disabled" label="Billing Address" /> </Grid>
                <Grid item xs={3}><TextFieldComp className={style.tf} id="outlined-disabled" label="City" /></Grid>

                <Grid item xs={2}><StateSelect /></Grid>
                <Grid item xs={4}><TextFieldComp className={style.tf} id="outlined-disabled" label="Country" /></Grid>
                <Grid item xs={3}><TextFieldComp className={style.tf} id="outlined-disabled" label="Zip Code" /></Grid>
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
                renderInput={(params) => <TextField className={style.tf} {...params} helperText={null} />}
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
    console.log(roomObj);

    const differenceInTime = roomObj.state.checkout.getTime() - roomObj.state.checkin.getTime();
    const days = differenceInTime / (1000 * 3600 * 24);
    const totalPrice = days * roomObj.state.price;

    return (
        <div className={style.temp}>
            <Grid container spacing={1}>
                <Grid item xs={5}>
                    <Paper
                        className={style.img}
                        sx={{
                            backgroundImage: `url(${roomObj.state.img})`,
                            height: '98%',
                            width: '80%',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center center',
                        }}>
                    </Paper>
                </Grid>
                <Grid item xs={5} container direction="column" align="left">
                    <Grid item xs style={{ "font-weight": "600", "font-size": "1.5em", "margin-bottom": "0%" }}>
                        {roomObj.state.name}
                    </Grid>
                    <Grid item xs style={{ "font-size": "1em" }}>
                        {roomObj.state.location}
                    </Grid>
                    <br />
                    <Grid item xs>
                        {roomObj.state.desc}
                    </Grid>
                    <Grid item xs>
                        {roomObj.state.roomInfo}
                    </Grid>
                    <br />
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
            <h1 align="center">Cancellation Policy</h1>
            <p><strong>Please Note:</strong> Booking cancellations are free until 1 week before the check-in date of your reservation. Cancellations within 1-week of your check-in date will result in a cancellation fee of $XXX.XX charged to the card used to make this reservation. We are unable to refund any payment for no-shows or early checkout.</p>
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