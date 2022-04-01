import React from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import DateRangePicker from '@mui/lab/DateRangePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { FormControl } from '@mui/material';

export default function SearchBar(props) {
  var backend_url = "http://localhost:8080";

  const [dates, setDates] = React.useState([null, null]);
  const [location, setLocation] = React.useState("");
  const [numGuests, setNumGuests] = React.useState(0);
  const [locations, setLocations] = React.useState([]);
  const [hotels, setHotels] = React.useState([]);
  const { onSearch, isLandingPage } = props;

  const navigate = useNavigate();

  const startSearch = (e) => {
    onSearch(location, dates, numGuests);
    e.preventDefault();
  }

  const navigateToMainSearchPage = (e) => {
    navigate('/hotel', { location: location, dates: dates, numGuests: numGuests });
  }

  useEffect(() => {
    fetch(backend_url + "/room", { method: 'GET' })
      .then(response => response.json())
      .then(response => {
        setTimeout(() => {
          setHotels(response);
        }, 1000);
      })
      .catch(e => {
        console.log('error' + e);
      })
  }, []);

  useEffect(() => {
    let hotelLocations = [];
    hotels.map((room) => {
      if (!hotelLocations.includes(room.location)) {
        hotelLocations.push(room.location);
      }
    })
    setLocations(hotelLocations);
  }, [hotels])

  return (
    <Box sx={{
      flexGrow: 0,
      width: "100%",
      height: "100%",
      position: "relative",
    }}>
      <Paper position="relative" sx={{ borderRadius: 10, padding: 0.5, backgroundColor: "#F9FBF7" }}>
        <Box component="form" onSubmit={startSearch}>
          <FormControl>
            <Toolbar variant="regular" >
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-demo"
                options={locations}
                freeSolo={true}
                onChange={(_event, selectedOption) => setLocation(selectedOption)}
                sx={{ minWidth: 200 }}
                renderInput={(params) =>
                  <TextField required={true} {...params}
                    onChange={(event) => {
                      setLocation(event.target.value);
                    }}
                    name="location"
                    label="Location"
                  />
                }
              />
              <Box sx={{ mx: 0 }}></Box>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box sx={{ mx: .3 }}></Box>
                <DateRangePicker
                  startText="Check-in"
                  endText="Check-out"
                  value={dates}
                  onChange={(newValue) => {
                    setDates(newValue);
                  }}
                  renderInput={(startProps, endProps) => (
                    <React.Fragment>
                      <TextField required={true} size="small" sx={{ minWidth: 150 }} {...startProps} />
                      <Box sx={{ mx: .3 }}></Box>
                      <TextField size="small" required={true} sx={{ minWidth: 150 }} {...endProps} />
                    </React.Fragment>
                  )}
                />
              </LocalizationProvider>
              <Box sx={{ mx: .3 }}></Box>
              <TextField id="Guests" label="Guests" name="numGuests" required={true} size="small" sx={{ minWidth: 100 }} onChange={(event) => { setNumGuests(event.target.value) }} type="number" variant="outlined" />
              <Box sx={{ mx: 1 }}></Box>

              {isLandingPage &&
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={navigateToMainSearchPage} sx={{ backgroundColor: "#9BB40D", color: "#FFFFFF" }}>
                  <SearchIcon />
                </IconButton>
                //   <IconButton edge="start" color="inherit" aria-label="menu" onClick={navigateToMainSearchPage} component={Link} to='/hotel' sx={{ backgroundColor: "#9BB40D", color: "#FFFFFF" }}>
                //   <SearchIcon />
                // </IconButton>
              }
              {!isLandingPage &&
                <IconButton edge="start" color="inherit" aria-label="menu" type="submit" sx={{ backgroundColor: "#9BB40D", color: "#FFFFFF" }}>
                  <SearchIcon />
                </IconButton>
              }
            </Toolbar>
          </FormControl>
        </Box>
      </Paper>
    </Box>
  );
}
/*add onClick={()=>{}} to button above to pass search info and link to search page */