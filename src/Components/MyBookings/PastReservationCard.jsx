import React, { Component, useState } from "react";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItem from '@mui/material/ListItem';

import {
    Box,
    Typography,
    Paper
} from '@mui/material/';

export default function PastReservationCard(props) {
    const { hotelName, description, price, checkIn, checkOut, image, firstName, lastName, email, guest, roomInfo, amenities, roomId, cardNumber } = props;

    //instant info payment detail
    const zipCode = "00000";

    const [open, setOpen] = useState(false);
   
    const handleClick = () => {
        setOpen(!open);
    };

    const styles = {
        imageContainer: {
            backgroundSize: 'cover',
            position: 'relative',
            minHeight: '200px',
            minWidth: '300px',
        }
    };

    const check_in = checkIn.substring(0,10);
    const check_out = checkOut.substring(0,10);
    const differenceInTime = Date.parse(checkOut) - Date.parse(checkIn);
    const days = differenceInTime / (1000 * 3600 * 24);

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
                                Reservation on {check_in} to {check_out}
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
                        </ListItem>

                        <ListItem>
                            <Paper style={styles.imageContainer} sx={{ backgroundImage: `url(${image})`, }} />
                            <ListItemText>
                            <Typography sx={{
                                    marginLeft: "3%",
                                    fontFamily: 'Baloo-Bhaina-2',
                                    fontWeight: "600",
                                    fontSize: 19,
                                    marginBottom: "1%"
                                }}>
                                    {roomInfo}
                                </Typography>
                                <Typography sx={{
                                    marginLeft: "3%",
                                    fontFamily: 'Baloo-Bhaina-2',
                                    marginBottom: "1%"
                                }}>
                                    {description}
                                </Typography>
                                <Typography sx={{
                                    marginLeft: "3%",
                                    fontFamily: 'Baloo-Bhaina-2',
                                    marginBottom: "1%"
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
                            <Typography marginLeft={1}>{check_in}</Typography>
                            <Typography sx={{
                                fontWeight: 600,
                                marginLeft: "3%",
                                fontFamily: 'Baloo-Bhaina-2',
                            }}>Check Out:</Typography>
                            <Typography marginLeft={1}>{check_out}</Typography>
                        </ListItem>

                        <ListItem>
                            <Typography sx={{
                                fontWeight: 600,
                                fontFamily: 'Baloo-Bhaina-2',
                            }}>
                                Guest: </Typography>
                            <Typography marginLeft={1} sx={{fontFamily: 'Baloo-Bhaina-2',}}>{guest}</Typography>
                        </ListItem>

                        <ListItem>
                            <Box width="70% " bgcolor="#9BB40D" padding="5px" borderRadius="10px">
                                <Typography marginLeft="2%" color="white" sx={{fontFamily: 'Baloo-Bhaina-2',}}>
                                    You redeemed ___ points and earned ___ points from this stay.
                                    ${price} a night for {days} nights - $__ = $___, including taxes.
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