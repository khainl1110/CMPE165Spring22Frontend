import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

  
  export default function SearchBar() {
    return (
      <Box sx={{ flexGrow: 1, 
        width: 600,
        height: 300,
        position: "relative",
        mx: "auto",
        my: 70,
      }}>
            <Paper position="static">
              <Toolbar variant="dense">
              <TextField id="Location" label="Location" variant="standard" />
              <TextField id="Guests" label="Guests" variant="standard" />
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ marginLeft: "auto" }}>
                  <SearchIcon />
                </IconButton>
              </Toolbar>
            </Paper>
        </Box>


      /*<div className={classes.searchbar}>
        <TextField id="Location" label="Location" variant="standard" />
        <TextField id="Guests" label="Guests" variant="standard" />
        <Fab size="medium" color="primary" aria-label="search">
          <SearchIcon />
        </Fab>
      </div>
      */
    );
  }