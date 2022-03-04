import React from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import DateRangePicker from '@mui/lab/DateRangePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

  
  export default function SearchBar() {

    const [value, setValue] = React.useState([null, null]);
    return (
      <Box sx={{ flexGrow: 0, 
        width: 1000,
        height: 300,
        position: "relative",
        mx: "auto",
        mt: 10,
        mb: 0
      }}>
            <Paper position="static" sx={{ borderRadius: 7, backgroundColor: "#F9FBF7" }}>
              <Toolbar variant="regular" >
                <TextField id="Location" label="Location" variant="standard" />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  
                <Box sx={{ mx: 1 }}></Box>
                  <DateRangePicker
                    startText="Check-in"
                    endText="Check-out"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(startProps, endProps) => (
                      <React.Fragment>
                        <TextField {...startProps} />
                        <Box sx={{ mx: 1 }}></Box>
                        <TextField {...endProps} />
                      </React.Fragment>
                    )}
                  />
                </LocalizationProvider>
                <Box sx={{ mx: 1 }}></Box>
                
                <TextField id="Guests" label="Guests" variant="standard" />
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ marginLeft: "auto", backgroundColor: "#9BB40D", color: "#FFFFFF" }}>
                  
                  <SearchIcon />
                </IconButton>
                
              </Toolbar>
            </Paper>
        </Box>
    );
  }
/*add onClick={()=>{}} to button above to pass search info and link to search page */