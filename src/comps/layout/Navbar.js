import React from 'react';
import { Link } from 'react-router-dom';
// material ui
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// redux

const styles = {
    root: {
        flexGrow: 1
    },
    myAppBar: {
        background: '#282828'
    },
    grow: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    }
};

// const logInLink = (
//     <Button color="inherit" component={Link} to="/auth">
//         Login
//     </Button>
// );
//
// const logOutLink = (
//     <Button color="inherit" component={Link} to="/logout">
//         Logout
//     </Button>
// );
//
// const Add = (
//     <Button color="inherit" component={Link} to="/add">
//         Add
//     </Button>
// );

function Navbar (props) {
    const { classes } = props;
    // console.log("Navbar.js, isLoggedIn = ", isLoggedIn, "\n");

    return (
        <div className={classes.root}>
            <AppBar className={classes.myAppBar} position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        color="inherit"
                        className={classes.grow}
                    >
                        Decktopia
                    </Typography>
                    <Button color="inherit" component={Link} to="/home/page1">
                        Home
                    </Button>
                    <Button color="inherit" component={Link} to="/login">
                        Login
                    </Button>
                    <Button color="inherit" component={Link} to="/register">
                        Register
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

Navbar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);
