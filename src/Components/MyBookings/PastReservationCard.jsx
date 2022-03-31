import React, {Component, useState} from "react";
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
    const {hotelName, description, price, checkIn, checkOut, image, firstName, lastName, email} = props;
    
    //instant info payment detail
    const cardNumber = "12323123213";
    const zipCode = "00000";
    const guest = "2 adult, 0 kids, 0 pets";

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const styles = {
        imageContainer: {
          backgroundSize: 'cover',
          position: 'relative',
          height: '300px',
          width: '300px',
        }
      };

    return(
        <List sx={{
            width: '100%',
            maxWidth: '350',
            
        }}>
            
            <ListItemButton onClick={handleClick} sx={{
                bgcolor: open ? "#78e150" : "#fafafa",
            }}>
            
                <ListItemText
                primary={
                    <React.Fragment>
                        <Typography sx={{
                            fontSize: 20,
                            fontWeight: 600
                        }}>
                            Reservation on {checkIn} to {checkOut}
                        </Typography>
                    </React.Fragment>
                }
                
                sx={{
                    backgroundColor:
                        open ? "#78e150" : "#fafafa",
                    color: 
                        open ? "white" : "black",
                    
                }}/>
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                
                    <Box sx={{
                        marginLeft: "3%",
                        marginBottom: "5%"
                    }}>
        
                        <ListItem>
                            <Typography sx={{
                                fontSize: 22,
                                fontWeight: 700,
                                width: "50%",
                                textDecoration: 'underline'
                            }}>
                                {hotelName}
                            </Typography>
                        </ListItem>
                     
                        <ListItem>
                            <Paper style={styles.imageContainer} sx={{ backgroundImage: `url(${image})`, }} />
                            <Typography sx={{
                                marginLeft: "3%"
                            }}>
                                {description}
                            </Typography>
                        </ListItem>

                        <ListItem>
                            <Typography sx={{
                                fontWeight: 600
                            }}>Check In: </Typography>
                            <Typography marginLeft={1}>{checkIn}</Typography>
                            <Typography sx={{
                                fontWeight: 600,
                                marginLeft: "3%"
                            }}>Check Out:</Typography> 
                            <Typography marginLeft={1}>{checkOut}</Typography>
                        </ListItem>
                        
                        <ListItem>
                        <Typography sx={{
                                fontWeight: 600
                                }}>
                                Guest: </Typography>
                        <Typography marginLeft={1}>{guest}</Typography>
                        </ListItem>

                       <ListItem>
                            <Box bgcolor="#78e150" borderRadius="10px">
                                <Typography marginLeft="2%" color="white">
                                    You redeemed ___ points and earned ___ points from this stay.
                                    ${price} a night for 1 night - $__ = $___, including taxes.
                                </Typography>
                            </Box>
                        </ListItem>
                        
                        <ListItem>
                            <Typography sx={{
                                fontSize:22,
                                fontWeight: 600,
                                }}>
                                    Your Info
                            </Typography>
                        </ListItem>
                              
                        <ListItem>
                            <Typography sx={{
                                fontWeight: 600
                                }}>First Name: </Typography>
                            <Typography marginLeft={1}> {firstName}</Typography>
                            <Typography sx={{
                            fontWeight: 600,
                            marginLeft: "3%"
                            }}>Last Name: </Typography>                                    
                            <Typography marginLeft={1}>{lastName}</Typography>
                        </ListItem>

                        <ListItem>
                            <Typography sx={{
                            fontWeight: 600
                            }}>Email: </Typography>
                            <Typography marginLeft={1}>{email}</Typography>
                        </ListItem>
                        
                        <ListItem>
                            <Typography sx={{
                            fontSize:22,
                            fontWeight: 600,
                            }}>
                                Payment Details</Typography>
                        </ListItem>

                        <ListItem>
                            <Typography sx={{
                            fontWeight: 600
                            }}>Card Number: </Typography>
                            <Typography marginLeft={1}>{cardNumber}</Typography>
                            <Typography sx={{
                            fontWeight: 600,
                            marginLeft: "3%"
                            }}>Zip Code: </Typography>
                            <Typography marginLeft={1}>{zipCode}</Typography>
                        </ListItem>
                          
                    </Box>
                </List>
            </Collapse>
        </List>
    )
}