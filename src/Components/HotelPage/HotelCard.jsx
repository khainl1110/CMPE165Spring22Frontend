
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    
});

const styles = {
  cardContainer: {
    backgroundColor: `#F9FBF7`,
    position: 'static',
    height: '20vh',
    width: '40vw'
  },
};

export default function HotelCard(){
return(
    <ThemeProvider theme={theme}>
            <Paper style={styles.cardContainer} sx={{}}>
                <Typography>
                    Test
                </Typography>
            </Paper>
    </ThemeProvider>
)
}