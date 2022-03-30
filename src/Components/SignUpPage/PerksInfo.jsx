import {
    Grid,
    Box,
    Typography,
} from '@mui/material/';

export default function PerksInfo() {
    return (
        <Grid item xs={4}>
            <Box
                sx={{
                    position: "absolute",
                    marginTop: '15%',
                    marginLeft: '2%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '40%',
                }}
            >
                <Typography
                    sx={{
                        fontFamily: 'Baloo Bhaina 2',
                        fontStyle: 'normal',
                        fontSize: '50px',
                        letterSpacing: '0.005em',
                        color: '#FFFFFF',
                        width: '100%'
                    }}
                >
                    Where to first?
                </Typography>
                <Typography
                    sx={{
                        marginTop: '10%',
                        fontFamily: 'Baloo Bhaina 2',
                        fontStyle: 'normal',
                        fontSize: '28px',
                        width: '100%',
                        letterSpacing: '0.005em',
                        color: '#FFFFFF'
                    }}
                >
                    Perks of a LikeHome account:
                </Typography>
                <Typography
                    sx={{
                        marginTop: '5%',
                        fontFamily: 'Baloo Bhaina 2',
                        fontStyle: 'normal',
                        fontSize: '20px',
                        width: '90%',
                        letterSpacing: '0.005em',
                        color: '#FFFFFF'
                    }}
                >
                    1. Gain reward points to put towards your next trip.
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Baloo Bhaina 2',
                        fontStyle: 'normal',
                        fontSize: '20px',
                        width: '90%',
                        letterSpacing: '0.005em',
                        color: '#FFFFFF'
                    }}
                >
                    2. Keep track of your past and current reservations.
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Baloo Bhaina 2',
                        fontStyle: 'normal',
                        fontSize: '20px',
                        width: '90%',
                        letterSpacing: '0.005em',
                        color: '#FFFFFF'
                    }}
                >
                    3. Save your information for a faster checkout.
                </Typography>
            </Box>
        </Grid>
    )
}