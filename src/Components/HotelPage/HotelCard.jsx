import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import img from "../../assets/landingPage/landing_bg.jpg"

const theme = createTheme({
    
});

const styles = {
  cardContainer: {
    backgroundColor: '#F9FBF7',
    position: 'static',
    height: '20vh',
    width: '40vw'
  },
  imageContainer: {
    backgroundImage: `url(${img})`,
    backgroundSize: 'cover',
    position: 'static',
    height: '20vh',
    width: '15vw',
  },
};

export default function HotelCard(){
return(
    <ThemeProvider theme={theme}>
            <Paper style={styles.cardContainer} sx={{}}>
              <Grid container direction="row" justifyContent="left" alignItems="center" spacing={0} sx={{ position: "relative", marginLeft: '0%',}}>
                <Grid item xs={0}>
                  <Paper style={styles.imageContainer} sx={{}}>
                  </Paper>
                </Grid>
                
                <Grid item xs={0}>
                  
                  <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={0} sx={{ position: "relative", marginLeft: '15%',}}>
                    <Grid item xs={0}>
                      <Typography variant="h2" sx={{
                        fontFamily: 'Baloo-Bhaina-2',
                        fontWeight: 600,
                        fontSize: '30px',
                        color: '#424242'
                        }}>
                        HotelName
                      </Typography>
                    </Grid>
                    <Grid item xs={0}>
                      <Typography variant="h2" sx={{
                        fontFamily: 'Baloo-Bhaina-2',
                        fontWeight: 400,
                        fontSize: '18px',
                        color: '#606060',
                        marginTop: '20%'
                        }}>
                        Hotel Address
                      </Typography>
                    </Grid>
                    <Grid item xs={0}>
                      <Typography variant="h2" sx={{
                        fontFamily: 'Baloo-Bhaina-2',
                        fontWeight: 400,
                        fontSize: '18px',
                        color: '#606060',
                        marginTop: '30%'
                        }}>
                        Hotel Offerings
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={0}>
                      <Grid container direction="row" justifyContent="left" alignItems="center" spacing={0} sx={{ position: "relative", marginTop: '50%',}}>
                        <Grid item xs={0}>
                          <Typography variant="h2" sx={{
                            fontFamily: 'Baloo-Bhaina-2',
                            fontWeight: 400,
                            fontSize: '21px',
                            color: '#606060',
                            }}>
                            ★
                          </Typography>
                        </Grid>
                        <Grid item xs={0}>
                          <Typography variant="h2" sx={{
                            fontFamily: 'Baloo-Bhaina-2',
                            fontWeight: 400,
                            fontSize: '21px',
                            color: '#606060',
                            }}>
                            n
                          </Typography>
                        </Grid>
                        <Grid item xs={0}>
                          <Typography variant="h2" sx={{
                            fontFamily: 'Baloo-Bhaina-2',
                            fontWeight: 400,
                            fontSize: '21px',
                            color: '#606060',
                            }}>
                            /5 stars
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>

                  </Grid>
                </Grid>

                <Grid item xs={0}>
                  <Grid container direction="column" justifyContent="center" alignItems="flex-end" spacing={0} sx={{ position: "relative", marginLeft: '160%',}}>
                    <Grid item xs={0}>
                        <Grid container direction="row" justifyContent="left" alignItems="center" spacing={0} sx={{ position: "relative", marginTop: '0%',}}>
                          <Grid item xs={0}>
                            <Typography variant="h2" sx={{
                              fontFamily: 'Baloo-Bhaina-2',
                              fontWeight: 700,
                              fontSize: '40px',
                              color: '#606060',
                              }}>
                              $
                            </Typography>
                          </Grid>
                          <Grid item xs={0}>
                            <Typography variant="h2" sx={{
                              fontFamily: 'Baloo-Bhaina-2',
                              fontWeight: 700,
                              fontSize: '40px',
                              color: '#606060',
                              }}>
                              nnn
                            </Typography>
                          </Grid>
                        </Grid>
                        <Typography variant="h2" sx={{
                          fontFamily: 'Baloo-Bhaina-2',
                          fontWeight: 700,
                          fontSize: '20px',
                          color: '#606060',
                          }}>
                          per night
                        </Typography>
                    </Grid>
                    <Grid item xs={0}>
                      <Button variant="contained" sx={{marginTop: '70%', backgroundColor: '#9BB40D'}}>
                        Check
                        Availability
                      </Button>
                    </Grid>

                  </Grid>

                </Grid>
              </Grid>
            </Paper>
    </ThemeProvider>
)
}