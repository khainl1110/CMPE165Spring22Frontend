import React, { Components } from 'react';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import { CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import NavBar from '../../Components/NavBar/NavBar.jsx';
import LoggedInNavBar from '../../Components/NavBar/LoggedInNavBar.jsx';
import SearchBar from '../../Components/LandingPageSearchBar/SearchBar.jsx';
import HotelCard from '../../Components/HotelPage/HotelCard.jsx';
import { useLocation } from 'react-router-dom';
import { backend_url } from "../../links";

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

var num;

const theme = createTheme({

});

const styles = {
    paperContainer: {
        backgroundColor: `#E5E5E5`,
        position: 'static',
        width: '100vw',
        minHeight: '110vh',
    },
};

function valuetext(value) {
    return `${value}°C`;
}

export default function HotelPage(props) {

    const location = useLocation();
    let [locat, setLocat] = useState("Union Square, San Francisco");
    let [numGuests, setNumGuests] = useState(4);

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const [dates, setDates] = React.useState([today, tomorrow]);

    useEffect(() => {
        if (location.state != null) {
            setLocat(location.state.location);
            setNumGuests(location.state.numGuests);
            setDates(location.state.dates);
        }
    }, []);

    let [isLoggedIn, setIsLoggedIn] = useState(false);
    let [sortBy, setSortBy] = useState('sort');
    let [hotels, setHotels] = useState([]);
    let [originalHotels, setOriginalHotels] = useState([]);
    let [allHotels, setAllHotels] = useState([]);
    let [inSearchMode, setInSearchMode] = useState(false);
    let [propertyNames, setPropertyNames] = useState([]);

    const [value1, setValue1] = React.useState([0, 1000]);
    const minDistance = 10;

    let card = [];

    useEffect(() => {
        let email = localStorage.getItem('email');
        if (email !== '') {
            setIsLoggedIn(true);
        }
    }, []);

    useEffect(() => {
        if (location.state == null) {
            fetch(
                backend_url + "/room/search?location=" + "Union Square, San Francisco" + "&numGuest=" + "4",
                { method: 'GET' }
            )
                .then(response => response.json())
                .then(response => {
                    setTimeout(() => {
                        setHotels(response);
                        setAllHotels(response);
                    }, 1000);
                })
                .catch(e => {
                    console.log('error' + e);
                })
        }
        else if (location.state.location == null) {
            fetch(
                backend_url + "/room/search?location=" + "Union Square, San Francisco" + "&numGuest=" + "4",
                { method: 'GET' }
            )
                .then(response => response.json())
                .then(response => {
                    setTimeout(() => {
                        setHotels(response);
                        setAllHotels(response);
                    }, 1000);
                })
                .catch(e => {
                    console.log('error' + e);
                })
        }
        else if (location.state.numGuests == "") {
            fetch(
                backend_url + "/room/search?location=" + location.state.location + "&numGuest=" + "4",
                { method: 'GET' }
            )
                .then(response => response.json())
                .then(response => {
                    setTimeout(() => {
                        setHotels(response);
                        setAllHotels(response);
                    }, 1000);
                })
                .catch(e => {
                    console.log('error' + e);
                })
        }
        else {
            if (location.state.numGuests >= 3) {
                numGuests = 4;
            } else {
                numGuests = 2;
            }
            fetch(
                backend_url + "/room/search?location=" + location.state.location + "&numGuest=" + numGuests,
                { method: 'GET' }
            )
                .then(response => response.json())
                .then(response => {
                    setTimeout(() => {
                        setHotels(response);
                        setAllHotels(response);
                    }, 1000);
                })
                .catch(e => {
                    console.log('error' + e);
                })
        }
    }, []);

    useEffect(() => {
        let hotelNames = [];
        hotels.map((room) => {
            if (!hotelNames.includes(room.hotelName)) {
                hotelNames.push(room.hotelName);
            }
        })
        setPropertyNames(hotelNames);
    }, [allHotels])

    const setPriceFilter = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
          return;
        }
        
        setHotels(originalHotels);

        if (newValue[0]<=newValue[1]) {
          setValue1([newValue[0], newValue[1]]);
        } else {
          setValue1([newValue[1], newValue[0]]);
        }
        console.log(value1[0]);
        console.log(value1[1]);

        let selectedHotels = [];
        hotels.map((room, event) => {
            if (room.price > value1[0] && room.price < value1[1]) {
                selectedHotels.push(room);
            }
        })
        setHotels(selectedHotels);
      };

    const onSearch = (location, dates, numGuests) => {
        setInSearchMode(true);
        setDates(dates);
        setNumGuests(numGuests);
        console.log("Set Dates in onSearch" + dates);

        if (location && dates && numGuests) {
            if (numGuests >= 3) {
                numGuests = 4;
            } else {
                numGuests = 2;
            }
            fetch(
                backend_url + "/room/search?location=" + location + "&numGuest=" + numGuests,
                { method: 'GET' }
            )
                .then(response => response.json())
                .then(response => {
                    setTimeout(() => {
                        setHotels(response);
                        setOriginalHotels(response);
                    }, 1000);
                })
                .catch(e => {
                    console.log('error' + e);
                })
        } else {
            console.log("Did not fetch room because missing location or numGuests");
            setInSearchMode(false);
            setHotels(allHotels);
        }
    }

    const handleSort = (event) => {
        setSortBy(event.target.value);
        if (event.target.value === 'lohi') {
            hotels.sort(sortLoHi('price'));
        } else if (event.target.value === 'hilo') {
            hotels.sort(sortHiLo('price'));
        } else if (event.target.value === 'lohirating') {
            hotels.sort(sortRatingLoHi('rating'));
        } else if (event.target.value === 'hilorating') {
            hotels.sort(sortRatingHiLo('rating'));
        }
    };

    const sortHiLo = (price) => {
        return function (a, b) {
            if (a[price] < b[price])
                return 1;
            else if (a[price] > b[price])
                return -1;
            return 0
        }
    }

    const sortLoHi = (price) => {
        return function (a, b) {
            if (a[price] > b[price])
                return 1;
            else if (a[price] < b[price])
                return -1;
            return 0
        }
    }

    const sortRatingHiLo = (rating) => {
        return function (a, b) {
            if (a[rating] < b[rating])
                return 1;
            else if (a[rating] > b[rating])
                return -1;
            return 0
        }
    }

    const sortRatingLoHi = (rating) => {
        return function (a, b) {
            if (a[rating] > b[rating])
                return 1;
            else if (a[rating] < b[rating])
                return -1;
            return 0
        }
    }

    const filterByProperty = (selectedOption) => {
        if (selectedOption !== null) {
            let selectedHotels = [];
            hotels.map((room, event) => {
                if (room.hotelName === selectedOption) {
                    selectedHotels.push(room);
                }
            })
            setHotels(selectedHotels);
        } else if (selectedOption === null && inSearchMode) {
            setHotels(originalHotels);
        } else if (selectedOption === null && !inSearchMode) {
            setHotels(allHotels);
        }
    }

    useEffect(() => {
        let hotelNames = [];
        hotels.map((room) => {
            if (!hotelNames.includes(room.hotelName)) {
                hotelNames.push(room.hotelName);
            }
        })
        setPropertyNames(hotelNames);
    }, [originalHotels])

    for (let i = 0; i < hotels.length; i++) {
        num = i + 1;
        card.push(
            <Grid item xs={0}>
                <Box>
                    <HotelCard room={hotels[i]} dates={dates} numGuests={numGuests} />
                </Box>
            </Grid>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <Paper style={styles.paperContainer} sx={{ boxShadow: 0 }}>
                <CssBaseline />
                {isLoggedIn &&
                    <LoggedInNavBar />
                }
                {!isLoggedIn &&
                    <NavBar />
                }
                <Grid container direction="row" alignItems="center" spacing={2} sx={{ position: "relative", marginLeft: '-2%', justifyContent: "center" }}>
                    <Grid item xs={0}>
                        <Box sx={{ marginTop: '10%' }}>
                            <SearchBar onSearch={onSearch} location={locat} dates={dates} numGuests={numGuests} isLandingPage={false} />
                        </Box>
                    </Grid>
                    <Grid item xs={0}>
                        <Box sx={{ marginTop: '41%', backgroundColor: "#F9FBF7" }}>
                            <Autocomplete
                                size="small"
                                disablePortal
                                id="combo-box-demo"
                                options={propertyNames}
                                sx={{ minWidth: 200 }}
                                onChange={(_event, selectedOption) => filterByProperty(selectedOption)}
                                renderInput={(params) => <TextField {...params} label="Filter By Property" />}
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={0}>
                        <Typography variant="h2" sx={{
                            fontFamily: 'Baloo-Bhaina-2',
                            fontWeight: 700,
                            fontSize: '18px',
                            color: '#424242',
                            marginTop: '23%',
                            marginLeft: '0%'
                        }}>
                            Price Range
                        </Typography>
                        <Box sx={{marginTop: '0%', width: 300}}>
                            <Slider
                            style={{ maxWidth: 500 }}
                            getAriaLabel={() => 'Price Range'}
                            value={value1}
                            onChange={setPriceFilter}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                            min={0}
                            step={10}
                            max={1000}
                            disableSwap
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={0}>
                        <Box sx={{ marginTop: '45%', backgroundColor: "#F9FBF7" }}>
                            <Select
                                label="Sort By"
                                sx={{ width: 180 }}
                                value={sortBy}
                                size="small"
                                onChange={handleSort}
                            >
                                <MenuItem value={'sort'}>Sort By</MenuItem>
                                <MenuItem value={'lohi'}>Price: Low to High</MenuItem>
                                <MenuItem value={'hilo'}>Price: High to Low</MenuItem>
                                <MenuItem value={'lohirating'}>Rating: Low to High</MenuItem>
                                <MenuItem value={'hilorating'}>Rating: High to Low</MenuItem>
                            </Select>
                        </Box>
                    </Grid>

                    <Grid container direction="column" alignItems="left" spacing={2} sx={{ position: "relative", marginTop: '1%', marginLeft: '20%', marginRight: '0%', justifyContent: "flex-end" }}>
                        <Grid item xs={0}>
                            <Box sx={{ marginTop: '0%' }}>
                                <Typography variant="h2" sx={{
                                    fontFamily: 'Baloo-Bhaina-2',
                                    fontWeight: 700,
                                    fontSize: '26px',
                                    color: '#424242'
                                }}>
                                    {hotels.length} Rooms Found
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={0}>
                            <Box sx={{ marginRight: '0%' }}>
                                {card}
                            </Box>
                        </Grid>
                    </Grid>

                </Grid>
            </Paper>
        </ThemeProvider >
    )
}