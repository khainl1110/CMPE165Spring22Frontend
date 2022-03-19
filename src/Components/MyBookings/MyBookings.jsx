import Typography from '@mui/material/Typography';
import LoggedInNavBar from '../NavBar/LoggedInNavBar.jsx';

export default function MyAccount() {

    return (
        <div>
            <LoggedInNavBar />
            <Typography variant="h2" component="div" gutterBottom
                sx={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    color: 'grey',
                    marginTop: '10%',
                }}
            >
                My Bookings Page
            </Typography>
        </div>
    )
}