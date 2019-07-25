import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Navbar from './Navbar';

const styles = theme => ({
    root: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: '85vw',
        maxWidth: '86vw',
        minHeight: '75vh',
        padding: '40px'
    }
});

function Layout ({ children, classes }) {
    return (
        <React.Fragment>
            <Navbar />
            {children}
        </React.Fragment>
    );
}

Layout.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Layout);
