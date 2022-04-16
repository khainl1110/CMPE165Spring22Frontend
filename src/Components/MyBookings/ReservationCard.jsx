import React, { Component, useState } from "react";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItem from '@mui/material/ListItem';
import EditIcon from '@mui/icons-material/Edit';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useNavigate } from "react-router-dom";

import {
    Box,
    Typography,
    Paper
} from '@mui/material/';

export default function ReservationCard(props) {
    const { hotelName, description, price, checkIn, checkOut, image, firstName, lastName, email, numGuest, roomInfo, amenities, roomId } = props;

    //instant info payment detail
    const cardNumber = "12323123213";
    const zipCode = "00000";

    const [open, setOpen] = useState(false);
   
    const handleClick = () => {
        setOpen(!open);
    };


    // pass the roomId to editReservation page
    const navigate = useNavigate();
    const editClick = () => {
        navigate('/editReservation', {
            state: {roomId, checkIn, checkOut, firstName, lastName}
        });
    };

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

            <ListItemButton onClick={handleClick}>

                <ListItemText
                    primary={
                        <React.Fragment>
                            <Typography sx={{
                                fontSize: 20,
                                fontWeight: 600,
                                fontFamily: 'Baloo-Bhaina-2',
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
                                fontSize: 20,
                                fontWeight: 600,
                                width: "50%",
                                textDecoration: 'underline',
                                fontFamily: 'Baloo-Bhaina-2',
                            }}>
                                {hotelName}
                            </Typography>

                            <ListItemButton onClick={editClick} sx={{
                                marginLeft: "20%",
                                maxWidth: "25%"
                            }}>
                                <ListItemIcon>
                                    <EditIcon />
                                </ListItemIcon>
                                <ListItemText primary="Edit Booking" sx={{ textDecoration: 'underline' }} />
                            </ListItemButton>
                        </ListItem>

                        <ListItem>
                            <Paper style={styles.imageContainer} sx={{ backgroundImage: `url(${image})`, }} />
                            <ListItemText>
                                <Typography sx={{
                                    marginLeft: "3%",
                                    fontFamily: 'Baloo-Bhaina-2',
                                }}>
                                    {description}
                                </Typography>
                                <Typography sx={{
                                    marginLeft: "3%",
                                    fontFamily: 'Baloo-Bhaina-2',
                                }}>
                                    {roomInfo}
                                </Typography>
                                <Typography sx={{
                                    marginLeft: "3%",
                                    fontFamily: 'Baloo-Bhaina-2',
                                }}>
                                    {amenities}
                                </Typography>
                            </ListItemText>
                        </ListItem>

                        <ListItem>
                            <Typography sx={{
                                fontWeight: 600,
                                fontFamily: 'Baloo-Bhaina-2',
                            }}>Check In: </Typography>
                            <Typography marginLeft={1}>{checkIn}</Typography>
                            <Typography sx={{
                                fontWeight: 600,
                                marginLeft: "3%",
                                fontFamily: 'Baloo-Bhaina-2',
                            }}>Check Out:</Typography>
                            <Typography marginLeft={1}>{checkOut}</Typography>
                        </ListItem>

                        <ListItem>
                            <Typography sx={{
                                fontWeight: 600,
                                fontFamily: 'Baloo-Bhaina-2',
                            }}>
                                Guest: </Typography>
                            <Typography marginLeft={1} sx={{fontFamily: 'Baloo-Bhaina-2',}}>{numGuest}</Typography>
                        </ListItem>

                        <ListItem>
                            <Box width="70% " bgcolor="#9BB40D" padding="5px" borderRadius="10px">
                                <Typography marginLeft="2%" color="white" sx={{fontFamily: 'Baloo-Bhaina-2',}}>
                                    You redeemed ___ points and earned ___ points from this stay.
                                    ${price} a night for 1 night - $__ = $___, including taxes.
                                </Typography>
                            </Box>
                        </ListItem>

                        <ListItem>
                            <Typography sx={{
                                fontSize: 22,
                                fontWeight: 600,
                                fontFamily: 'Baloo-Bhaina-2',
                            }}>
                                Your Info
                            </Typography>
                        </ListItem>

                        <ListItem>
                            <Typography sx={{
                                fontWeight: 600,
                                fontFamily: 'Baloo-Bhaina-2',
                            }}>First Name: </Typography>
                            <Typography marginLeft={1}> {firstName}</Typography>
                            <Typography sx={{
                                fontWeight: 600,
                                marginLeft: "3%",
                                fontFamily: 'Baloo-Bhaina-2',
                            }}>Last Name: </Typography>
                            <Typography marginLeft={1} sx={{fontFamily: 'Baloo-Bhaina-2',}}>{lastName}</Typography>
                        </ListItem>

                        <ListItem>
                            <Typography sx={{
                                fontWeight: 600,
                                fontFamily: 'Baloo-Bhaina-2',
                            }}>Email: </Typography>
                            <Typography marginLeft={1} sx={{fontFamily: 'Baloo-Bhaina-2',}}>{email}</Typography>
                        </ListItem>

                        <ListItem>
                            <Typography sx={{
                                fontSize: 22,
                                fontWeight: 600,
                                fontFamily: 'Baloo-Bhaina-2',
                            }}>
                                Payment Details</Typography>
                        </ListItem>

                        <ListItem>
                            <Typography sx={{
                                fontWeight: 600,
                                fontFamily: 'Baloo-Bhaina-2',
                            }}>Card Number: </Typography>
                            <Typography marginLeft={1} sx={{fontFamily: 'Baloo-Bhaina-2',}}>{cardNumber}</Typography>
                            <Typography sx={{
                                fontWeight: 600,
                                marginLeft: "3%",
                                fontFamily: 'Baloo-Bhaina-2',
                            }}>Zip Code: </Typography>
                            <Typography marginLeft={1} sx={{fontFamily: 'Baloo-Bhaina-2',}}>{zipCode}</Typography>
                        </ListItem>

                    </Box>
                </List>
            </Collapse>
        </List >
    )
}