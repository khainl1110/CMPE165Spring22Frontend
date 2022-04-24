import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import style from '../CheckReservation/check.module.css';
import { Grid,Button } from '@mui/material';
import NavBar from '../NavBar/NavBar.jsx';
import LoggedInNavBar from '../NavBar/LoggedInNavBar';
import FormControl from '@material-ui/core/FormControl';

export default function Check(){
    return(
        <div className = {style.main}>
            <Grid container direction="column" justifyContent="space-evenly" spacing={5} >
                <Grid item xs={12}>
                    <NavBar />
                </Grid>
                <Grid container direction ="row" justifyContent="space-evenly">
                    <Grid item xs={6} ><EmailBox/></Grid>
                    <Grid item xs={6}><ConfirmBox/></Grid>
                </Grid>
                <Grid container direction ="row" justifyContent="space-between">
                    <Grid item xs={5.4} ></Grid>
                    <Grid item xs={4}>
                        <Button
                        type="submit"
                        variant="contained"
                        sx={{backgroundColor: '#9BB40D', fontWeight: '500',width:"45%" , mt:5}}
                        >
                        Check
                        </Button>
                    </Grid>
                    <Grid item xs={2.6}></Grid>
                    </Grid>
                    
                </Grid>
        </div>
    )
}
const EmailBox =() =>{
    const[e,setEmail] = React.useState("");
    let handleOnChange = ( email ) => {

        // don't remember from where i copied this code, but this works.
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
        if ( re.test(email) ) {
            // this is a valid email address
            // call setState({email: email}) to update the email
            // or update the data in redux store.
            setEmail(email);
            console.log(email)
        }
        else {
            // invalid email, maybe show an error to the user.
            return (
                <TextField
                error
                id="outlined-error"
                label="Error"
                defaultValue="Hello World"
              />
            )
        }
    
    }
    return (<div className ={style.boxy}>
        <h2 align="center">Your Email</h2>
        <TextField type="email" onChange = {handleOnChange} id = "email" required label ="Email" sx ={{marginLeft:"25%",width:"50%"}}/>
    </div>)
}

const ConfirmBox =() =>(
    <div className ={style.boxy}>
        <h2 align="center">Confirmation number</h2>
        <TextField required id = "conNum" label ="Confirmaion number" sx ={{marginLeft:"25%",width:"50%"}}/>
    </div>
)