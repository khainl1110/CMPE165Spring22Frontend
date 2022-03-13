import * as React from 'react';
import {useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import { Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavBar from '../../Components/NavBar/NavBar.jsx';
import SearchBar from '../../Components/LandingPageSearchBar/SearchBar.jsx';
import HotelCard from '../../Components/HotelPage/HotelCard.jsx';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';



const theme = createTheme({
    
});

const styles = {
  paperContainer: {
    backgroundColor: `#E5E5E5`,
    position: 'static',
    height: '101vh',
    width: '100vw'
  },
};

export default function HotelPage() {

    const [Sort, setSort] = React.useState('');

    const handleChange = (event) => {
        setSort(event.target.value);
      };

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
        <ThemeProvider theme={theme}>
            <Paper style={styles.paperContainer} sx={{ boxShadow: 0,}}>
                
                    <CssBaseline />
                    <NavBar />
                    

                    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ position: "relative", marginLeft: '-1%',}}>
                        <Grid item xs={0}>
                            <Box sx={{marginTop: '10%'}}>
                            <SearchBar />
                            </Box>
                        </Grid>
                        <Grid item xs={0}>
                            <Box sx={{marginTop: '50%', backgroundColor: "#F9FBF7"}}>
                                <TextField id="property" label="Filter By Property" variant="outlined"/>
                            </Box>
                        </Grid>
                        <Grid item xs={0}>
                            <Box sx={{marginTop: '64.5%', backgroundColor: "#F9FBF7"}}>
                                <Select
                                    labelId="Sorting"
                                    id="Sorting"
                                    value={'lohi'}
                                    label="Sort"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={'lohi'}>Price: Low to High</MenuItem>
                                    <MenuItem value={'hilo'}>Price: High to Low</MenuItem>
                                </Select>
                            </Box>
                        </Grid>


                        <Grid container direction="column" justifyContent="flex-end" alignItems="left" spacing={2} sx={{ position: "relative", marginTop: '2%' , marginLeft: '20%', marginRight: '0%',}}>
                            <Grid item xs={0}>
                                <Box sx={{marginTop: '0%'}}>
                                    <Typography variant="h2" sx={{
                                    fontFamily: 'Baloo-Bhaina-2',
                                    fontWeight: 700,
                                    fontSize: '45px',
                                    color: '#424242'
                                    }}>
                                        'N' Rooms Found in 'Location'
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={0}>
                            <Box sx={{marginRight: '0%'}}>
                                <HotelCard/>
                            </Box>
                            </Grid>
                            <Grid item xs={0}>
                            <Box sx={{marginRight: '0%'}}>
                                <HotelCard/>
                            </Box>
                            </Grid>
                        </Grid>

                    </Grid> 
            </Paper>
        </ThemeProvider>
    )
}