import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import LoggedInNavBar from '../NavBar/LoggedInNavBar.jsx';
import { backend_url } from "../../links";

export default function MyAccount() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        let email = localStorage.getItem('email');

        if (email !== '') {
            fetch(backend_url + "/users/" + email, { method: 'GET' })
                .then(response => response.json())
                .then(data => {
                    setFirstName(data.firstName);
                    setLastName(data.lastName);
                    setEmail(data.email);
                })
                .catch(e => {
                    console.log('error' + e);
                })
        }
    })

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
                My Account Page
            </Typography>
            <Typography>
                First Name: {firstName}
            </Typography>
            <Typography>
                Last Name: {lastName}
            </Typography>
            <Typography>
                Email: {email}
            </Typography>
        </div>
    )
}