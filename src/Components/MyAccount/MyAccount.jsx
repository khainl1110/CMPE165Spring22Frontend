import { useEffect, useState } from 'react';
import LoggedInNavBar from '../NavBar/LoggedInNavBar.jsx';
import { backend_url } from "../../links";
import {
    Button,
    CssBaseline,
    TextField,
    FormControl,
    Grid,
    Box,
    Typography,
    Container,
    Paper,
    CardMedia,
    Card,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemButton
} from '@mui/material/';
import EditIcon from '@mui/icons-material/Edit';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import bannerImage from "../../assets/accountPage/banner.jpg";
import { useNavigate } from "react-router-dom";


export default function MyAccount() {
    const [user, setUser] = useState();
    const [email, setEmail] = useState(localStorage.getItem('email'))
    const [point, setPoint] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();

    useEffect(() => {

        if (email !== '') {
            fetch(backend_url + "/users/" + email, { method: 'GET' })
                .then(response => response.json())
                .then(data => {
                    setUser(data);
                    setPoint(data.points);
                    setFirstName(data.firstName);
                    setLastName(data.lastName);
                })
                .catch(e => {
                    console.log('error' + e);
                })
        }
    }, [])

    const navigate = useNavigate();
    const editClick = () => {
        navigate('/editAccount', {
            state: {
                firstName: user.firstName,
                lastName: user.lastName,
                password: user.password,
                email: user.email,
                points: user.points,
                paymentId: user.paymentId
            }
        });
    }

    // const countRedeemable = point / 50.0;
    const discount = (point / 10.0).toFixed(2);
    // parseInt(countRedeemable * 5);

    if (email !== '') {
        return (
            <div>
                <Grid container direction="column" justifyContent="space-evenly">
                    <Grid item xs={12}>
                        <LoggedInNavBar />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography sx={{
                            // marginTop: "100px",
                            marginLeft: "50px",
                            fontFamily: 'Baloo-Bhaina-2',
                            fontSize: 26,
                            fontWeight: 700
                        }}>
                            My Account
                        </Typography>
                        <CardMedia component="img" alt="banner image" sx={{
                            maxHeight: "400px",
                            width: "100%",
                            objectFit: "fill",
                            marginTop: "10px"
                        }} image={bannerImage} />
                    </Grid>



                </Grid>

                <Grid container direction="column" justify="center" alignItems="center" spacing={0}>
                    <List sx={{
                        width: "55%",
                    }}>
                        <ListItem sx={{ marginTop: "2%" }}>
                            <AccountCircleIcon sx={{ fontSize: 35 }} />
                            <Typography sx={{
                                marginLeft: "2%",
                                fontSize: 24,
                                fontWeight: 600,
                                fontFamily: 'Baloo-Bhaina-2',
                            }}>
                                Hi, {firstName}. Welcome Back!
                            </Typography>
                        </ListItem>

                        <ListItem>
                            <Typography sx={{
                                fontFamily: 'Baloo-Bhaina-2',
                                fontSize: 22,
                                fontWeight: 600
                            }}>
                                Contact Info
                            </Typography>

                            <ListItemButton onClick={editClick} sx={{
                                marginLeft: "67%",
                                maxWidth: "150px",
                            }}>
                                <ListItemIcon>
                                    <EditIcon />
                                </ListItemIcon>
                                <ListItemText primary={<Typography sx={{
                                    fontFamily: 'Baloo-Bhaina-2',
                                    fontSize: 20,
                                    fontWeight: 600
                                }}>Edit</Typography>} sx={{ textDecoration: 'underline' }} />
                            </ListItemButton>
                        </ListItem>

                        <ListItem>
                            <Typography sx={{
                                fontFamily: 'Baloo-Bhaina-2',
                                fontSize: 18,
                                fontWeight: 600,
                                marginTop: "1%"
                            }}>
                                First Name:
                            </Typography>

                            <Typography sx={{
                                marginLeft: "1%",
                                fontFamily: 'Baloo-Bhaina-2',
                                fontSize: 18,
                                marginTop: "1%"
                            }}>
                                {firstName}
                            </Typography>

                            <Typography sx={{
                                marginLeft: "10%",
                                fontFamily: 'Baloo-Bhaina-2',
                                fontSize: 18,
                                fontWeight: 600,
                                marginTop: "1%"
                            }}>
                                Last Name:
                            </Typography>

                            <Typography sx={{
                                marginLeft: "1%",
                                fontFamily: 'Baloo-Bhaina-2',
                                fontSize: 18,
                                marginTop: "1%"
                            }}>
                                {lastName}
                            </Typography>
                        </ListItem>

                        <ListItem>
                            <Typography sx={{
                                fontFamily: 'Baloo-Bhaina-2',
                                fontSize: 18,
                                fontWeight: 600,
                                marginTop: "1%"
                            }}>
                                Email:
                            </Typography>

                            <Typography sx={{
                                marginLeft: "1%",
                                fontFamily: 'Baloo-Bhaina-2',
                                fontSize: 18,
                                marginTop: "1%"
                            }}>
                                {email}
                            </Typography>
                        </ListItem>

                        <ListItem>
                            <Typography sx={{
                                marginTop: "3%",
                                fontFamily: 'Baloo-Bhaina-2',
                                fontSize: 22,
                                fontWeight: 600,
                            }}>
                                Rewards Points
                            </Typography>
                        </ListItem>

                        <ListItem>
                            <Box width="100% " bgcolor="#9BB40D" padding="8px" borderRadius="10px" sx={{ marginTop: "1%" }}>
                                <ListItem>
                                    <Typography sx={{
                                        color: "white",
                                        fontFamily: 'Baloo-Bhaina-2',
                                        fontSize: 18,
                                    }}>
                                        For every $2 spent on a booking, you will earn 1 point towards any booking of your choice.
                                    </Typography>
                                </ListItem>

                                <ListItem>
                                    <Typography sx={{
                                        color: "white",
                                        fontFamily: 'Baloo-Bhaina-2',
                                        fontSize: 18,
                                    }}>
                                        10 points = $1 off your booking.
                                    </Typography>
                                </ListItem>
                            </Box>
                        </ListItem>

                        <ListItem>
                            <Typography sx={{
                                fontFamily: 'Baloo-Bhaina-2',
                                fontSize: 18,
                                fontWeight: 600,
                                marginTop: "1%"
                            }}>
                                Points Earned:
                            </Typography>

                            <Typography sx={{
                                marginLeft: "1%",
                                fontFamily: 'Baloo-Bhaina-2',
                                fontSize: 18,
                                marginTop: "1%"
                            }}>
                                {point}
                            </Typography>
                        </ListItem>

                        <ListItem>
                            <Typography sx={{
                                fontFamily: 'Baloo-Bhaina-2',
                                fontSize: 18,
                                fontWeight: 600,
                                marginTop: "1%"
                            }}>
                                Redeemable Discount:
                            </Typography>

                            <Typography sx={{
                                marginLeft: "1%",
                                fontFamily: 'Baloo-Bhaina-2',
                                fontSize: 18,
                                marginTop: "1%"
                            }}>
                                $ {discount}
                            </Typography>
                        </ListItem>

                    </List>
                </Grid>
            </div>
        )
    }
    else {
        window.location.replace('/');
    }
}