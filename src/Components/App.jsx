import { useEffect} from "react";
import { Link } from 'react-router-dom';

export default function App() {

    useEffect(() => {
        fetch('http://localhost:8080/')
        .then(data => data.json())
        .then(data => {
            console.log(data)
            alert(data.username)
        })
    }, [])

    return(
        <>
            <h1>Test</h1>

            <Link to="/login">Log In</Link> |{" "}
            <Link to = "/signup" >Sign Up</Link>
        </>
    )
}