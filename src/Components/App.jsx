import React from 'react';
import { Link } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import SearchBar from '../Components/LandingPageSearchBar/SearchBar.jsx';
import bg from "../assets/landing_bg.jpg"
import r1 from "../assets/rec1.png"
import r2 from "../assets/rec2.png"
import r3 from "../assets/rec3.png"
import r4 from "../assets/rec4.png"
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

const theme = createTheme({
});

const styles = {
  paperContainer: {
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
      width: '100%',
      backgroundImage: `url(${bg})`,
      position: 'relative',
  },
  bottomPage: {
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minheight: '45vh',
      width: '100%',
      backgroundColor: '#8E8A86',
  }
};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Paper style={styles.paperContainer}>
        <Container component="main" justifyContent="center" position="absolute">
          <CssBaseline />
          <Grid container direction="column" justifyContent="flex-start"  alignItems="center">
            <Grid item xs={0}>
            <Box sx={{
                position: "relative",
                marginTop: '400px',
                alignItems: 'left',
            }}
            >
              <Typography variant="h2" sx={{
                    fontFamily: 'Baloo-Bhaina-2',
                    fontWeight: 600,
                    fontSize: '75px',
                    color: '#FFFFFF'
                }}>
                  Welcome home.
              </Typography>
            </Box>
            <Grid item xs={0}>
              <Box sx={{
                position: "relative",
                marginTop: '50px',
                marginLeft: '150px',
                alignItems: 'center',
              }}
              >
              <Typography variant="h5" sx={{
                    fontFamily: 'Baloo-Bhaina-2',
                    fontWeight: 500,
                    fontSize: '25px',
                    color: '#FFFFFF'
                }}>
                  Start Searching
              </Typography>
              </Box>
            </Grid>
            </Grid>
            <Grid item xs={0}>
              <SearchBar />
            </Grid>
            <Grid item xs={0}>
              <Link to = "/signup">Returning Users</Link>
            </Grid>
          </Grid>
        </Container>
      </Paper>
      <Paper style={styles.bottomPage} position="absolute">
        <Grid container direction="row" justifyContent="flex-start"  alignItems="center">
          <Grid item xs={0}>
                <Box sx={{
                position: "relative",
                marginTop: '25px',
                marginLeft: '75px',
                alignItems: 'left',
                }}>
                <Typography variant="h4" sx={{
                      fontFamily: 'Baloo-Bhaina-2',
                      fontweight: 600,
                      fontsize: '50px',
                      color: '#FFFFFF'
                  }}>
                    Ideas for your next trip:
                </Typography>
                </Box>
                <Grid container item spacing={0}>
                  <Grid item xs={3}>
                  <Box sx={{
                    position: "relative",
                    marginTop: '25px',
                    marginLeft: '75px',
                    alignItems: 'left',
                  }}>
                  <Card sx={{ minWidth: 500, background: "#F9FBF7"}}>
                    <CardMedia
                      style={{height: 400, width: 510, paddingTop: '56.25%'}}
                      image={r1}
                      title="Getaway"
                    />
                    <CardContent sx={{backgroundColor: "none", color: "none"}}>
                    <Typography variant="subtitle2" align="right" sx={{
                      fontFamily: 'Baloo-Bhaina-2',
                      fontweight: 700,
                      fontsize: '25px',
                      color: '#000000'
                    }}>
                      Romantic Anniversary Getaway in Aspen
                    </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>

                  </Box>
                  </Grid>

                  <Grid item xs={3}>
                  <Box sx={{
                    position: "relative",
                    marginTop: '25px',
                    marginLeft: '30px',
                    alignItems: 'left',
                  }}>
                  <Card sx={{ minWidth: 500, background: "#F9FBF7" }}>
                    <CardMedia
                      style={{height: 400, width: 510, paddingTop: '56.25%'}}
                      image={r2}
                      title="Family Vacation"
                    />
                    <CardContent sx={{backgroundColor: "none", color: "none"}}>
                    <Typography variant="subtitle2" align="right" sx={{
                      fontFamily: 'Baloo-Bhaina-2',
                      fontweight: 700,
                      fontsize: '25px',
                      color: '#000000'
                    }}>
                      Family-Friendly Vacation in Orlando
                    </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>
                  </Box>
                  </Grid>

                  <Grid item xs={3}>
                  <Box sx={{
                    position: "relative",
                    marginTop: '25px',
                    marginLeft: '0px',
                    alignItems: 'left',
                  }}>
                  <Card sx={{ minWidth: 500, background: "#F9FBF7"}}>
                    <CardMedia
                      style={{height: 400, width: 510, paddingTop: '56.25%'}}
                      image={r3}
                      title="Spring Break"
                    />
                    <CardContent sx={{backgroundColor: "none", color: "none"}}>
                    <Typography variant="subtitle2" align="right" sx={{
                      fontFamily: 'Baloo-Bhaina-2',
                      fontweight: 700,
                      fontsize: '25px',
                      color: '#000000'
                    }}>
                      Spring Break in Miami
                    </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>

                  </Box>
                  </Grid>

                  <Grid item xs={3}>
                  <Box sx={{
                    position: "relative",
                    marginTop: '25px',
                    marginLeft: '0px',
                    alignItems: 'left',
                  }}>
                  <Card sx={{ minWidth: 500, background: "#F9FBF7" }}>
                    <CardMedia
                      style={{height: 400, width: 510, paddingTop: '56.25%'}}
                      image={r4}
                      title="Bangkok"
                    />
                    <CardContent sx={{backgroundColor: "none", color: "none"}}>
                    <Typography variant="subtitle2" align="right" sx={{
                      fontFamily: 'Baloo-Bhaina-2',
                      fontweight: 700,
                      fontsize: '25px',
                      color: '#000000'
                    }}>
                      Just Because in Bangkok
                    </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>

                  </Box>
                  </Grid>
                </Grid>
          </Grid>
        </Grid>
      </Paper>  
    </ThemeProvider>
  );
}