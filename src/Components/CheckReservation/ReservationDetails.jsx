import React, { Component, useState } from "react";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItem from '@mui/material/ListItem';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useNavigate } from "react-router-dom";

import {
    Box,
    Typography,
    Paper
} from '@mui/material/';

export default function ReservationDetail(props) {
    // const { hotelName, description, price, checkIn, checkOut, image, firstName, lastName, email, numGuest, roomInfo, amenities, roomId, id } = props;
    const { location, hotelName, description, price, checkIn, checkOut, image, firstName, lastName, email, guest, roomInfo, amenities, roomId, cardNumber, paymentId, reservId, points, oneDayPrice, userInfo, totalPrice } = props;

    //instant info payment detail
    // const cardNumber = "12323123213";
    // const zipCode = "00000";

    const [open, setOpen] = useState(false);

    const cardNumLength = cardNumber.length;
    const cardNumDisplay = "**** **** **** " + cardNumber.substring(cardNumLength - 4, cardNumLength);

    const handleClick = () => {
        // setOpen(!open);
    };


    // pass the roomId to editReservation page
    const navigate = useNavigate();
    const editClick = () => {
        navigate('/editReservationNA', {
            state: { roomId, checkIn, checkOut, firstName, lastName, price, paymentId, guest, reservId, points: 0, email }
            // state: { roomId, checkIn, checkOut, firstName, lastName, price: oneDayPrice, paymentId, guest, reservId, points, user: userInfo }
        });
    };
    const cancelClick = () => {
        navigate('/cancel', {
            // state: { hotelName, image, description, amenities, roomInfo, numGuest: guest, checkIn, checkOut, id: reservId, price }
            state: { hotelName, image, description, amenities, roomInfo, numGuest: guest, checkIn, checkOut, id: reservId, price, location }
        });
    }

    const styles = {
        imageContainer: {
            backgroundSize: 'cover',
            position: 'relative',
            minHeight: '200px',
            minWidth: '300px',
        }
    };

    return (
        <List sx={{
            bgcolor: open ? "#9BB40D" : "#fafafa",
            width: '100%',
        }}>

            <ListItem sx={{ backgroundColor: "#9BB40D" }}>
                <ListItemText
                    primary={
                        <React.Fragment>
                            <Typography sx={{
                                fontSize: 20,
                                fontWeight: 600,
                            }}>
                                Reservation on {checkIn} to {checkOut}
                            </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>

            <List component="div" disablePadding>

                <Box sx={{
                    marginLeft: "3%",
                    marginBottom: "5%"
                }}>

                    <ListItem>
                        <Typography sx={{
                            fontSize: 18,
                            fontWeight: 600,
                            width: "45%",
                            marginTop: '2%',
                            textDecoration: 'underline',
                        }}>
                            {hotelName}
                        </Typography>

                        <ListItemButton onClick={editClick} sx={{
                            marginLeft: "10%",

                        }}>
                            <ListItemIcon>
                                <EditIcon />
                            </ListItemIcon>
                            <ListItemText primary="Edit Booking" sx={{}} />
                        </ListItemButton>
                        <ListItemButton onClick={cancelClick} sx={{

                        }}>
                            <ListItemIcon>
                                <CloseIcon />
                            </ListItemIcon>
                            <ListItemText primary="Cancel" sx={{}} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem>
                        <Paper style={styles.imageContainer} sx={{ backgroundImage: `url(${image})`, }} />
                        <ListItemText>
                            <Typography sx={{
                                marginLeft: "3%",
                                fontWeight: "600",
                                fontSize: 16,
                                marginBottom: "1%"
                            }}>
                                {roomInfo}
                            </Typography>
                            <Typography sx={{
                                marginLeft: "3%",
                                // fontFamily: 'Baloo-Bhaina-2',
                                marginBottom: "1%",
                                fontSize: 14,
                            }}>
                                {location}
                            </Typography>
                            <Typography sx={{
                                marginLeft: "3%",
                                // fontFamily: 'Baloo-Bhaina-2',
                                marginBottom: "1%",
                                fontSize: 14,
                            }}>
                                {description}
                            </Typography>
                            <Typography sx={{
                                marginLeft: "3%",
                                // fontFamily: 'Baloo-Bhaina-2',
                                marginBottom: "1%",
                                fontSize: 14,
                            }}>
                                {amenities}
                            </Typography>

                            <ListItem sx={{ marginTop: '4%' }}>
                                <Typography sx={{
                                    fontWeight: 600,
                                    fontSize: 14,
                                }}>Check In: </Typography>
                                <Typography marginLeft={1} sx={{ fontSize: '14px' }}>{checkIn}</Typography>
                                <Typography sx={{
                                    fontWeight: 600,
                                    fontSize: 14,
                                    marginLeft: "3%",
                                }}>Check Out:</Typography>
                                <Typography marginLeft={1} sx={{ fontSize: '14px' }}>{checkOut}</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography sx={{
                                    fontWeight: 600,
                                    fontSize: 14,
                                }}>
                                    Guest: </Typography>
                                <Typography marginLeft={1} sx={{ fontSize: 14, }}>{guest}</Typography>
                            </ListItem>
                        </ListItemText>
                    </ListItem>

                    <ListItem>
                        <Typography sx={{
                            fontSize: 18,
                            fontWeight: 600,
                            marginTop: '2%'
                            // fontFamily: 'Baloo-Bhaina-2',
                        }}>
                            Your Info
                        </Typography>
                    </ListItem>

                    <ListItem>
                        <Typography sx={{
                            fontWeight: 600,
                            fontSize: 14,
                            // fontFamily: 'Baloo-Bhaina-2',
                        }}>First Name: </Typography>
                        <Typography marginLeft={1} sx={{ fontSize: 14, }}> {firstName}</Typography>
                        <Typography sx={{
                            fontWeight: 600,
                            marginLeft: "6%",
                            fontSize: 14,
                            // fontFamily: 'Baloo-Bhaina-2',
                        }}>Last Name: </Typography>
                        <Typography marginLeft={1} sx={{ fontSize: 14, }}>{lastName}</Typography>
                    </ListItem>

                    <ListItem>
                        <Typography sx={{
                            fontWeight: 600,
                            fontSize: 14,
                            // fontFamily: 'Baloo-Bhaina-2',
                        }}>Email: </Typography>
                        <Typography marginLeft={1} sx={{ fontSize: 14, }}>{email}</Typography>
                    </ListItem>

                    <ListItem>
                        <Typography sx={{
                            fontSize: 18,
                            fontWeight: 600,
                            marginTop: '2%'
                            // fontFamily: 'Baloo-Bhaina-2',
                        }}>
                            Payment Details</Typography>
                    </ListItem>

                    <ListItem>
                        <Typography sx={{
                            fontWeight: 600,
                            fontSize: 14,
                        }}>Total Price:
                        </Typography>

                        <Typography marginLeft={1} sx={{ fontSize: 14, }}>
                            $ {totalPrice.toFixed(2)}
                        </Typography>

                    </ListItem>

                    <ListItem>
                        <Typography sx={{
                            fontWeight: 600,
                            fontSize: 14,
                        }}>Card Number: </Typography>
                        <Typography marginLeft={1} sx={{ fontSize: 14, }}>{cardNumDisplay}</Typography>
                        {/* <Typography sx={{
                                fontWeight: 600,
                                marginLeft: "3%",
                                fontFamily: 'Baloo-Bhaina-2',
                            }}>Zip Code: </Typography>
                            <Typography marginLeft={1} sx={{fontFamily: 'Baloo-Bhaina-2',}}>{zipCode}</Typography> */}
                    </ListItem>

                </Box>
            </List>
        </List >
    )
}