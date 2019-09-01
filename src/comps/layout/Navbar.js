import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
// material ui
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// locals
import { AuthContext } from '../../context/auth';
import { navbarStyles } from './styled';

function Navbar (props) {
    const { classes } = props;
    const context = useContext(AuthContext);

    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography
                        variant="h6"
                        color="inherit"
                        className={classes.grow}
                    >
                        Decktopia
                    </Typography>
                    <Button color="inherit" component={Link} to="/home">
                        Home
                    </Button>
                    {context.user && (
                        <Button
                            component={Link}
                            to="/home"
                            color="inherit"
                            onClick={() => {
                                context.logout();
                            }}
                        >
                            Logout
                        </Button>
                    )}
                    {context.user && (
                        <Button component={Link} to="/add" color="inherit">
                            Add Deck
                        </Button>
                    )}
                    {!context.user && (
                        <Button color="inherit" component={Link} to="/login">
                            Login
                        </Button>
                    )}
                    {!context.user && (
                        <Button color="inherit" component={Link} to="/register">
                            Register
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}

Navbar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(navbarStyles)(Navbar);
