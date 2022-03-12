import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import NavBar from '../NavBar/NavBar.jsx';
import LoggedInNavBar from '../NavBar/LoggedInNavBar.jsx';

export default function HotelPage() {

    let [hotels, setHotels] = useState([]);
    let [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // fetch('http://localhost:8080/hotels/testGet')
        //     .then(data => data.json())
        //     .then(data => {
        //         console.log(data)
        //         setHotels(data)
        //     })

        let email = localStorage.getItem('email');
        console.log(localStorage.getItem('email'));

        if (email !== '') {
            setIsLoggedIn(true);
        }
    })

    return (
        <div>
            {isLoggedIn &&
                <LoggedInNavBar />
            }
            {!isLoggedIn &&
                <NavBar />
            }
            <Typography variant="h2" component="div" gutterBottom>
                This is list of hotelsa
            </Typography>
            <Grid container>
                {
                    hotels.map(hotel => {
                        return (
                            <Grid item>
                                <h1>{hotel.hotelName}</h1>
                                <h2>{hotel.hotelAddress} </h2>
                                <img src={hotel.picUrl} alt="test" width="300" height="300" />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </div>
    )
}