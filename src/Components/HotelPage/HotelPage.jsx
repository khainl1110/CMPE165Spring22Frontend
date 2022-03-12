import {useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export default function HotelPage() {

    let [hotels, setHotels] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/hotels/testGet')
        .then(data => data.json())
        .then(data => {
            console.log(data)
            setHotels(data)
        })
    })

    return (
        <div>
            <Typography variant="h2" component="div" gutterBottom>
                This is list of hotelsa
            </Typography>
            <Grid container>
            {
                hotels.map( hotel => {
                    return(
                        <Grid item>
                        <h1>{hotel.hotelName}</h1>
                        <h2>{hotel.hotelAddress} </h2>
                        <img src = {hotel.picUrl} alt = "test" width = "300" height = "300"/>
                        </Grid>
                    ) 
                })
            }
            </Grid>
        </div>
    )
}