import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import style from '../PaymentPage/Payment.module.css';
import { MenuItem, Button} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';
import NavBar from '../NavBar/NavBar.jsx';
import { backend_url } from "../../links";
import Grid from '@mui/material/Grid';


export default function Payment(){
    
    return(
    <div className ={style.main}>
      <Grid container direction = "column" justifyContent = "space-evenly" spacing ={6} >
        <Grid item xs ={12}><NavBar/></Grid>
        <Grid item xs = {12} align = "center"><HotelRoomDetails/></Grid>
        <Grid item><GreenPrompt/></Grid>
        <Grid item><UserInfo/></Grid>
        <Grid item><PaymentDetails/></Grid>
        <Grid item align = "center"><CancelationPolicy/></Grid>
        <Grid item ><Button
                      type="submit"
                      variant="contained"
                      sx={{ mt: 2, mb: 0, backgroundColor: '#9BB40D', fontWeight: '500' }}
                    >
                      Review Reservation
                    </Button>
        </Grid>
      </Grid>
    </div>
    )

}


const TextFieldComp = ({name,type,className,id,label, defaultValue = ""}) =>{
    return(
        
        <>
            <TextField
              variant = "standard"
                required
                type = {type}
                className = {className}
                id={id}
                label={label}
                defaultValue={defaultValue}
                size = "small"
                margin = "dense"
            />
        
        </>
    );
}

const UserInfo = ({className}) =>{
    className = {className}
    return (
    <div className = {style.YourInfo}>
        <p className = {style.p}>Your Info</p>
          <Grid container spacing = {0}>
            <Grid item xs ={6}><TextFieldComp className = {style.tf}id = "outlined-disabled" label = "First Name"/></Grid>
            <Grid item xs ={6}><TextFieldComp className = {style.tf} id = "outlined-disabled" label = "Last Name"/></Grid>
            <Grid item xs ={6}><TextFieldComp className = {style.tf} id = "outlined-disabled" label = "Email" type = "email"/></Grid>
            <Grid item xs ={6}><TextFieldComp className = {style.tf} id = "outlined-disabled" label = "Phone"/></Grid>
          </Grid>

    </div>
)}

const ModeOfPayment = () =>{

    const ModeOfPayments = [
        "Credit Card",
        "Debit Card"
    ];

    const[payment , setPayment] = React.useState(ModeOfPayments[0]);

    const handleChange = (event) =>{
        setPayment(event.target.value);
    }

    return (<>
        <TextField
        variant = "standard"
          id="outlined-select-currency"
          select
          value={payment}
          onChange={handleChange}
          className = {style.mop}
          size= "small"
          margin = "dense"
        >
        {
            ModeOfPayments.map((x) =>(
                <MenuItem value = {x}>{x}</MenuItem>
            ))
        }
        </TextField>
    </>);
}

const PaymentDetails = () =>{
  
    return(
        <div className = {style.PaymentDetails}>
            <p>Payment Details</p>
            <Grid container spacing = {1.5} >
            <Grid item xs ={6}><ModeOfPayment/></Grid>
            <Grid item xs = {6}/>
            <Grid item xs = {5}><TextFieldComp className = {style.tf} id = "outlined-disabled" label = "Card Number"/></Grid>
            <Grid item xs ={1}><TextFieldComp password className = {style.tf} id = "outlined-disabled" label = "CVV" type = "password"/></Grid>
            <Grid item xs={6}/>
            <Grid item xs ={4}><MonthAndYear/></Grid>
            <Grid item xs ={6}/>

            <Grid item xs = {5}><TextFieldComp className = {style.tf} id = "outlined-disabled" label = "Billing Address"/></Grid>   
            <Grid item xs = {5}><TextFieldComp className = {style.tf} id = "outlined-disabled" label = "City"/></Grid>    
            <Grid item xs = {2}/>
            <Grid item xs ={1}><StateSelect/></Grid>
            <Grid item xs = {4}><TextFieldComp className = {style.tf} id = "outlined-disabled" label = "Country"/></Grid>
            <Grid item xs = {1}><TextFieldComp className = {style.states} id = "outlined-disabled" label = "Zip Code"/></Grid> 

            </Grid>
        </div>
    )
}

const MonthAndYear = ({className}) =>{
    const [value, setValue] = React.useState(new Date());
    return(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    
                    className = {style.date}
                    views={['year', 'month']}
                    label="Year and Month"
                    minDate={new Date('2022-01-01')}
                    maxDate={new Date('2032-06-01')}
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue);
                        }}
                renderInput={(params) => <TextField className = {style.tf} {...params} helperText={null} />}
                />  
        </LocalizationProvider> 
    )
}

const GreenPrompt = () =>{
  
  return(
    <div className = {style.greenPrompt}>
      <p>Wait! By signing up for a LikeHome account, you could earn 600 points for this reservation to redeem and save on future trips! Learn more here.</p>
    </div>
  )
}

const HotelRoomDetails = () =>{
  return (
    <div className = {style.temp}>
        <Grid container spacing ={2}>
          <Grid item xs ={4}><div className = {style.img}>alt</div></Grid>
          <Grid item xs ={6} container direction = "column">
            <Grid item xs>
              Standard Room, 2 Queen
            </Grid>
            <Grid item xs>
              No Smoking
            </Grid>
            <Grid item xs>
              Fits 4
            </Grid>
            <Grid item xs>
              2 queen beds
            </Grid>
            <Grid item container spacing = {2}> 
              <Grid item xs ={4}>
                Checkin 
              </Grid>
              <Grid item xs ={4}>
                Checkout 
              </Grid>
              <Grid item xs ={4}>
                Guests
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs ={2} container direction= "column">
            <Grid item>
              $600
            </Grid> 
            <Grid item>
              For 2 nights
            </Grid> 
          </Grid>
        </Grid>
    </div>
  )
}

const CancelationPolicy =() =>{
  return(
    <div className = {style.policy}>
      <h1 align = "center">Cancellation Policy</h1>
      <p><strong>Please Note:</strong> Booking cancellations are free until 1 week before the check-in date of your reservation. Cancellations within 1-week of your check-in date will result in a cancellation fee of $XXX.XX charged to the card used to make this reservation. We are unable to refund any payment for no-shows or early checkout.</p> 
      <br/>
      <p>By booking with LikeHome.com, you agree to the terms and conditions of our cancellation policy.</p>
    </div>
  )
}
const StateSelect = () =>{
    const states = [
        {
          "name": "Alabama",
          "abbreviation": "AL"
        },
        {
          "name": "Alaska",
          "abbreviation": "AK"
        },
        {
          "name": "American Samoa",
          "abbreviation": "AS"
        },
        {
          "name": "Arizona",
          "abbreviation": "AZ"
        },
        {
          "name": "Arkansas",
          "abbreviation": "AR"
        },
        {
          "name": "California",
          "abbreviation": "CA"
        },
        {
          "name": "Colorado",
          "abbreviation": "CO"
        },
        {
          "name": "Connecticut",
          "abbreviation": "CT"
        },
        {
          "name": "Delaware",
          "abbreviation": "DE"
        },
        {
          "name": "District Of Columbia",
          "abbreviation": "DC"
        },
        {
          "name": "Federated States Of Micronesia",
          "abbreviation": "FM"
        },
        {
          "name": "Florida",
          "abbreviation": "FL"
        },
        {
          "name": "Georgia",
          "abbreviation": "GA"
        },
        {
          "name": "Guam",
          "abbreviation": "GU"
        },
        {
          "name": "Hawaii",
          "abbreviation": "HI"
        },
        {
          "name": "Idaho",
          "abbreviation": "ID"
        },
        {
          "name": "Illinois",
          "abbreviation": "IL"
        },
        {
          "name": "Indiana",
          "abbreviation": "IN"
        },
        {
          "name": "Iowa",
          "abbreviation": "IA"
        },
        {
          "name": "Kansas",
          "abbreviation": "KS"
        },
        {
          "name": "Kentucky",
          "abbreviation": "KY"
        },
        {
          "name": "Louisiana",
          "abbreviation": "LA"
        },
        {
          "name": "Maine",
          "abbreviation": "ME"
        },
        {
          "name": "Marshall Islands",
          "abbreviation": "MH"
        },
        {
          "name": "Maryland",
          "abbreviation": "MD"
        },
        {
          "name": "Massachusetts",
          "abbreviation": "MA"
        },
        {
          "name": "Michigan",
          "abbreviation": "MI"
        },
        {
          "name": "Minnesota",
          "abbreviation": "MN"
        },
        {
          "name": "Mississippi",
          "abbreviation": "MS"
        },
        {
          "name": "Missouri",
          "abbreviation": "MO"
        },
        {
          "name": "Montana",
          "abbreviation": "MT"
        },
        {
          "name": "Nebraska",
          "abbreviation": "NE"
        },
        {
          "name": "Nevada",
          "abbreviation": "NV"
        },
        {
          "name": "New Hampshire",
          "abbreviation": "NH"
        },
        {
          "name": "New Jersey",
          "abbreviation": "NJ"
        },
        {
          "name": "New Mexico",
          "abbreviation": "NM"
        },
        {
          "name": "New York",
          "abbreviation": "NY"
        },
        {
          "name": "North Carolina",
          "abbreviation": "NC"
        },
        {
          "name": "North Dakota",
          "abbreviation": "ND"
        },
        {
          "name": "Northern Mariana Islands",
          "abbreviation": "MP"
        },
        {
          "name": "Ohio",
          "abbreviation": "OH"
        },
        {
          "name": "Oklahoma",
          "abbreviation": "OK"
        },
        {
          "name": "Oregon",
          "abbreviation": "OR"
        },
        {
          "name": "Palau",
          "abbreviation": "PW"
        },
        {
          "name": "Pennsylvania",
          "abbreviation": "PA"
        },
        {
          "name": "Puerto Rico",
          "abbreviation": "PR"
        },
        {
          "name": "Rhode Island",
          "abbreviation": "RI"
        },
        {
          "name": "South Carolina",
          "abbreviation": "SC"
        },
        {
          "name": "South Dakota",
          "abbreviation": "SD"
        },
        {
          "name": "Tennessee",
          "abbreviation": "TN"
        },
        {
          "name": "Texas",
          "abbreviation": "TX"
        },
        {
          "name": "Utah",
          "abbreviation": "UT"
        },
        {
          "name": "Vermont",
          "abbreviation": "VT"
        },
        {
          "name": "Virgin Islands",
          "abbreviation": "VI"
        },
        {
          "name": "Virginia",
          "abbreviation": "VA"
        },
        {
          "name": "Washington",
          "abbreviation": "WA"
        },
        {
          "name": "West Virginia",
          "abbreviation": "WV"
        },
        {
          "name": "Wisconsin",
          "abbreviation": "WI"
        },
        {
          "name": "Wyoming",
          "abbreviation": "WY"
        }
      ]

      const[payment , setPayment] = React.useState();

      const handleChange = (event) =>{
          setPayment(event.target.value);
      }
  
      return (<>
          <TextField
          variant = "standard"
            id="outlined-select-currency"
            select
            value={payment}
            onChange={handleChange}
            className = {style.states}
            label= "State"
            size= "small"

          margin = "dense"
          >
          {
              states.map((x) =>(
                  <MenuItem value = {x.abbreviation}>{x.abbreviation}</MenuItem>
              ))
          }
          </TextField>
      </>);  
}