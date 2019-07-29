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

function Navbar (props) {
    const { classes } = props;
    const context = useContext(AuthContext);

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
                    <Button color="inherit" component={Link} to="/home/decks">
                        Home
                    </Button>
                    {context.user && (
                        <Button
                            color="inherit"
                            onClick={() => {
                                context.logout();
                            }}
                        >
                            Logout
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

export default withStyles(styles)(Navbar);
