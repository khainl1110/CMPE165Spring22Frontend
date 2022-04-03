import * as React from 'react';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { render } from '@testing-library/react';

var backend_url = "http://localhost:8080";
var name = "testname";
var img = "";
var rate = "4";
var desc = "test description here 1 2 3";
var price = "333";
var location = "test location";
var roomInfo = "room info: 2 beds";

const theme = createTheme({

});

const styles = {
  cardContainer: {
    minWidth: '920px',
    backgroundColor: '#F9FBF7',
    position: 'relative',
    width: '52vw',
  },
  imageContainer: {
    backgroundSize: 'cover',
    position: 'relative',
    height: '26vh',
    width: '19vw',
  }
};

export default function HotelCard(props) {
  name = props.room.hotelName;
  img = props.room.image;
  rate = props.room.rating;
  desc = props.room.description;
  price = props.room.price;
  roomInfo = props.room.roomInfo;
  location = props.room.location;

  // reaction of "reserve now" button for demo
  const onClickHandle = (event) => {
    let userEmail = localStorage.getItem('email');
    let roomId = props.room.id;
    const postData = { roomId, userEmail };

    if (props.room.booked !== true) {
      fetch(backend_url + "/reservation", {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(
        alert("Successfully booked!")
      )
      fetch(backend_url + "/room/" + roomId, {
        method: 'PUT',
        body: JSON.stringify({
          hotelName: props.room.hotelName,
          image: props.room.image,
          location: props.room.location,
          rating: props.room.rating,
          description: props.room.description,
          price: props.room.price,
          booked: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())

      window.location.replace("/hotel");
    }
    else {
      alert("The room is already booked");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: 2,
          marginBottom: 2,
          marginLeft: "0%",
        }}
        style={styles.cardContainer}
      >
        <Grid container direction="row" justifyContent="left" alignItems="center" spacing={0} sx={{ position: "static", marginTop: '0%' }}>
          <Grid item xs={0}>
            <Paper style={styles.imageContainer} sx={{ backgroundImage: `url(${img})`, }}>
            </Paper>
          </Grid>

          <Grid item xs={5}>
            <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={0} sx={{
              position: "static", marginLeft: '10%', width: '100%'
            }}>
              <Grid item xs={0}>
                <Typography variant="h3" sx={{
                  fontFamily: 'Baloo-Bhaina-2',
                  fontWeight: 600,
                  fontSize: '22px',
                  color: '#424242'
                }}>
                  {name}
                </Typography>
              </Grid>
              <Grid item xs={0}>
                <Typography variant="h2" sx={{
                  fontFamily: 'Baloo-Bhaina-2',
                  fontWeight: 400,
                  fontSize: '18px',
                  color: '#606060',
                  marginTop: '2%'
                }}>
                  {location}
                </Typography>
              </Grid>
              <Grid item xs={0}>
                <Typography variant="h2" sx={{
                  fontFamily: 'Baloo-Bhaina-2',
                  fontWeight: 400,
                  fontSize: '18px',
                  color: '#606060',
                  marginTop: '5%'
                }}>
                  Room Type: {roomInfo}
                </Typography>
              </Grid>
              <Grid item xs={0}>
                <Typography variant="h2" sx={{
                  fontFamily: 'Baloo-Bhaina-2',
                  fontWeight: 400,
                  fontSize: '18px',
                  color: '#606060',
                  marginTop: '2%'
                }}>
                  Description: {desc}
                </Typography>
              </Grid>
              <Grid item xs={0}>
                <Grid container direction="row" justifyContent="left" alignItems="center" spacing={0} sx={{ position: "static", marginTop: '20%', }}>
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
                      {rate}
                    </Typography>
                  </Grid>
                  <Grid item xs={0}>
                    <Typography variant="h2" sx={{
                      fontFamily: 'Baloo-Bhaina-2',
                      fontWeight: 400,
                      fontSize: '21px',
                      color: '#606060',
                    }}>
                      /10 stars
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

            </Grid>
          </Grid>

          <Grid item xs={3}>
            <Grid container direction="column" justifyContent="right" alignItems="flex-end" spacing={0} sx={{ marginLeft: '0%', position: "static" }}>
              <Grid item xs={0}>
                <Grid container direction="row" justifyContent="left" alignItems="center" spacing={0} sx={{ position: "static", marginTop: "0%", }}>
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
                      {price}
                    </Typography>
                  </Grid>
                </Grid>
                <Typography variant="h2" sx={{
                  fontFamily: 'Baloo-Bhaina-2',
                  fontWeight: 700,
                  fontSize: '18px',
                  color: '#606060',
                }}>
                  per night
                </Typography>
              </Grid>
              <Grid item xs={0}>
                <Button variant="contained" onClick={onClickHandle} sx={{ marginTop: '70%', backgroundColor: '#9BB40D' }}>
                  Reserve Now
                </Button>
              </Grid>

            </Grid>

          </Grid>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
}