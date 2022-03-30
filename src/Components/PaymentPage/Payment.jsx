import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import style from '../PaymentPage/Payment.module.css';
import { MenuItem } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Stack from '@mui/material/Stack';

export default function Payment(){
    

    return(
        <div className = {style.main}>
            <div>
                <UserInfo className = {style.YourInfo}/>
            </div>

            <PaymentDetails/>
        </div>
    )

}

const TextFieldComp = ({className,id,label, defaultValue = ""}) =>{
    return(
        
        <>
            <TextField
                required
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
    className = {className};
    return (
    <div className = {style.YourInfo}>
        <p className = {style.p}>Your Info</p>
        <ul>
            <li><TextFieldComp className = {style.tf} id = "outlined-disabled" label = "First Name"/></li>
            <li><TextFieldComp className = {style.tf} id = "outlined-disabled" label = "Last Name"/></li>
            <li><TextFieldComp className = {style.tf} id = "outlined-disabled" label = "Email"/></li>
            <li><TextFieldComp className = {style.tf} id = "outlined-disabled" label = "Phone"/></li>
        </ul>
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
          id="outlined-select-currency"
          select
          value={payment}
          onChange={handleChange}
          className = {style.tf}
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
            <ModeOfPayment/><br/>
            <TextFieldComp className = {style.tf} id = "outlined-disabled" label = "Card Number"/>
            <TextFieldComp password className = {style.tf} id = "outlined-disabled" label = "CVV"/>
            <br/>
            <MonthAndYear className = {style.tf}/>
             <br/>
            <TextFieldComp className = {style.tf} id = "outlined-disabled" label = "Billing Address"/>   
            <TextFieldComp className = {style.tf} id = "outlined-disabled" label = "City"/>   
            <br/>
            <StateSelect/>

        </div>
    )
}

const MonthAndYear = ({className}) =>{
    const [value, setValue] = React.useState(new Date());
    return(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    
                    className = {className}
                    views={['year', 'month']}
                    label="Year and Month"
                    minDate={new Date('2022-01-01')}
                    maxDate={new Date('2032-06-01')}
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue);
                        }}
                renderInput={(params) => <TextField {...params} helperText={null} />}
                />  
        </LocalizationProvider> 
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
            id="outlined-select-currency"
            select
            value={payment}
            onChange={handleChange}
            className = {style.states}
            label= "State"
          >
          {
              states.map((x) =>(
                  <MenuItem value = {x.abbreviation}>{x.abbreviation}</MenuItem>
              ))
          }
          </TextField>
      </>);  
}