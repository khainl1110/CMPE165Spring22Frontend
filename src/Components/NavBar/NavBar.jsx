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
  logoContainer: {
    flexGrow: "1",
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

export default function NavBar() {
  return (
    <AppBar style={styles.navbar}>
      <Toolbar>
        <div style={styles.logoContainer}>
          <Link variant="h4" to="/" style={styles.logo}>
            LikeHome
          </Link>
        </div>
        <div style={styles.navlinks}>
          <Link to="/hotel" style={styles.link}>
            Search Hotels
          </Link>
          <Link to="/login" style={styles.link}>
            Sign In
          </Link>
          <Link to="/signup" style={styles.link}>
            Sign Up
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
}