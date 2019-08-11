import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Navbar from './Navbar';
import { layoutStyles } from './styled';

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

export default withStyles(layoutStyles)(Layout);
