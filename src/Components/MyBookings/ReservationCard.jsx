import React, { Component, useState } from "react";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItem from '@mui/material/ListItem';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useNavigate } from "react-router-dom";

import {
    Box,
    Typography,
    Paper
} from '@mui/material/';
import userEvent from "@testing-library/user-event";

export default function ReservationCard(props) {
    const { hotelName, description, price, checkIn, checkOut, image, firstName, lastName, email, guest, roomInfo, amenities, roomId, cardNumber, paymentId, reservId, points, oneDayPrice, userInfo } = props;

    //instant info payment detail
    //const zipCode = "00000";

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const cardNumLength = cardNumber.length;
    const cardNumDisplay = "**** **** **** " + cardNumber.substring(cardNumLength - 4, cardNumLength);


    // pass the roomId to editReservation page
    const navigate = useNavigate();
    const editClick = () => {
        navigate('/editReservation', {
            state: { roomId, checkIn, checkOut, firstName, lastName, price: oneDayPrice, paymentId, guest, reservId, points, user: userInfo }
        });
    };
    const cancelClick = () => {
        navigate('/cancel', {
            state: { hotelName, image, description, amenities, roomInfo, numGuest: guest, checkIn, checkOut, id: reservId, price: oneDayPrice }
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

    const differenceInTime = Date.parse(checkOut) - Date.parse(checkIn);
    const days = differenceInTime / (1000 * 3600 * 24);
    const discount = points / 10.0;
    const finalPrice = price - discount;
    const earningPoint = finalPrice / 2.0;

    return (
        <List sx={{
            bgcolor: open ? "#9BB40D" : "#fafafa",
            width: '100%',
        }}>

            <ListItemButton onClick={handleClick}>

                <ListItemText
                    primary={
                        <React.Fragment>
                            <Typography sx={{
                                fontSize: 17,
                                fontWeight: 600,
                            }}>
                                Reservation on {checkIn} to {checkOut}
                            </Typography>
                        </React.Fragment>
                    }

                    sx={{
                        backgroundColor:
                            open ? "#9BB40D" : "#fafafa",
                        color:
                            open ? "white" : "black",

                    }} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit sx={{ bgcolor: "#fafafa" }}>
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
                                        // fontFamily: 'Baloo-Bhaina-2',
                                    }}>
                                        Guest: </Typography>
                                    <Typography marginLeft={1} sx={{ fontSize: 14, }}>{guest}</Typography>
                                </ListItem>
                            </ListItemText>
                        </ListItem>

                        <ListItem>
                            <Box width="70% " bgcolor="#9BB40D" padding="5px" borderRadius="10px">
                                <Typography marginLeft="2%" color="white" sx={{ fontSize: 14, }}>
                                    You redeemed {points} points and earned {earningPoint} points from this stay.
                                    ${price.toFixed(2)} for {days} nights - ${discount.toFixed(2)} = ${finalPrice.toFixed(2)}, including taxes.
                                </Typography>
                            </Box>
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
                                // fontFamily: 'Baloo-Bhaina-2',
                            }}>Total Price:
                            </Typography>

                            <Typography marginLeft={1} sx={{ fontSize: 14, }}>
                                $ {finalPrice.toFixed(2)}
                            </Typography>

                        </ListItem>

                        <ListItem>
                            <Typography sx={{
                                fontWeight: 600,
                                fontSize: 14,
                                // fontFamily: 'Baloo-Bhaina-2',
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
            </Collapse>

        </List >
    )
}