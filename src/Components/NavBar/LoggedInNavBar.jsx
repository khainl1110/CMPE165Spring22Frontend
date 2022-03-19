import AppBar from '@mui/material/AppBar';
import { Link } from "react-router-dom";
import { Toolbar } from '@mui/material';

const styles = {
    navlinks: {
        display: "flex",
    },
    logo: {
        color: "#363D21",
        flexGrow: "1",
        cursor: "pointer",
        fontSize: "25px",
        fontWeight: "bold",
        textDecoration: "none",
    },
    link: {
        textDecoration: "none",
        color: '#363D21',
        fontSize: "17px",
        fontWeight: "bold",
        marginLeft: 40,
    },
    navbar: {
        backgroundColor: "white",
    }
};

const logout = () => {
    console.log("local storage: " + localStorage.getItem("email"));
    localStorage.setItem("email", '');
    console.log("after logout: " + localStorage.getItem("email"));
}

export default function LoggedInNavBar() {
    return (
        <AppBar style={styles.navbar}>
            <Toolbar>
                <Link variant="h4" to="/" style={styles.logo}>
                    LikeHome
                </Link>
                <div style={styles.navlinks}>
                    <Link to="/hotelTest" style={styles.link}>
                        Search
                    </Link>
                    <Link to="/myBookings" style={styles.link}>
                        My Bookings
                    </Link>
                    <Link to="/myAccount" style={styles.link}>
                        My Account
                    </Link>
                    <Link to="/" onClick={logout} style={styles.link}>
                        Logout
                    </Link>
                </div>
            </Toolbar>
        </AppBar>
    );
}
