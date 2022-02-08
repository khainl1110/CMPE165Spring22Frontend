import { useEffect} from "react";

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
        </>
    )
}