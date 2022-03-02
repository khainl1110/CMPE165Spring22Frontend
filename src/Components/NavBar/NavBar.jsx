import { makeStyles } from '@material-ui/core/styles';
import { AppBar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    
}));
  
  export default function NavBar() {
    const classes = useStyles();
    return (
      <div>
          <AppBar>
              <h1>temp holder</h1>
          </AppBar>
      </div>
    );
  }