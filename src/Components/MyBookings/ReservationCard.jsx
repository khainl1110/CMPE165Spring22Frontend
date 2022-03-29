import React, {Component, useState} from "react";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItem from '@mui/material/ListItem';
import EditIcon from '@mui/icons-material/Edit';
import ListItemIcon from '@mui/material/ListItemIcon';

import {
    Grid,
    Box,
    Typography,
  } from '@mui/material/';

export default function ReservationCard(props) {
    const {hotelName, description, price, checkIn, checkOut, image, firstName, lastName, email} = props;
    
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };


    return(


        <List sx={{
            width: '100%',
            maxWidth: '350',
            
        }}>
            
            <ListItemButton onClick={handleClick} sx={{
                bgcolor: open ? "lightGreen" : "white",
            }}>
            
                <ListItemText primary={"Reservation on -Date- to -Date-"} sx={{
                    backgroundColor:
                        open ? "lightGreen" : "white",
                }}/>
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                
                    <Box sx={{
                        marginLeft: "3%"
                    }}>
        
                    
                        <List sx={{display: 'flex',
                            flexDirection: 'row',
                            padding: 2,
                            }}>
                            <Typography sx={{
                                fontSize: 22,
                                fontWeight: 400
                            }}>
                                {hotelName}
                            </Typography>
                            <ListItem>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <EditIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Edit Booking"/>
                                    </ListItemButton>
                                </ListItem>
                        </List>
                        
                        <ListItem>
                            <img scr={image} width="300" height="300" alt=""></img>
                            <Typography sx={{
                                marginLeft: "3%"
                            }}>
                                {description}
                            </Typography>
                        </ListItem>

                        <List sx={{display: 'flex',
                            flexDirection: 'row',
                            padding: 0,}}>
                                
                                <ListItem>
                                    <Typography>Check In: {checkIn}</Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography>Check Out: {checkOut}</Typography>
                                </ListItem>
                        </List>
                        <Typography>
                            Guest: 
                        </Typography>

                        <Box width="70% "bgcolor="lightGreen" borderRadius="18px">
                            <Typography marginLeft="2%">
                                You redeemed ___ points and earned ___ points from this stay.
                                ${price} a night for 1 night - $__ = $___, including taxes.
                            </Typography>
                        </Box>

                        <Typography>
                                Your Info
                            </Typography>
                            <List sx={{display: 'flex',
                                flexDirection: 'row',
                                padding: 0,}}>
                                    
                                    <ListItem>
                                        <Typography>First Name: {firstName}</Typography>
                                    </ListItem>
                                    <ListItem>
                                        <Typography>Last Name: {lastName}</Typography>
                                    </ListItem>
                            </List>

                            <List sx={{display: 'flex',
                                flexDirection: 'row',
                                padding: 0,}}>
                                    
                                    <ListItem>
                                        <Typography>Email: {email}</Typography>
                                    </ListItem>
                            </List>

                            <Typography>Payment Details</Typography>
                            <List sx={{display: 'flex',
                                flexDirection: 'row',
                                padding: 0,}}>
                                    
                                    <ListItem>
                                        <Typography>Card Number: </Typography>
                                    </ListItem>
                                    <ListItem>
                                        <Typography sx={{marginLeft: "3%"}}>Zip Code: </Typography>
                                    </ListItem>
                            </List>
                    
                            
                        
                    </Box>
                </List>
            </Collapse>
        </List>









        
    )
}