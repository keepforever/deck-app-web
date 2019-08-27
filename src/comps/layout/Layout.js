import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Navbar from './Navbar';
import Snackbar from '@material-ui/core/Snackbar';
import { AuthContext } from '../../context/auth';

import { layoutStyles } from './styled';

function Layout ({ children, classes }) {
    const authContext = useContext(AuthContext);
    return (
        <React.Fragment>
            <Navbar />
            {children}
            <Snackbar
                open={authContext.snackbar.isOpen}
                autoHideDuration={2000}
                onClose={() => authContext.removeMessage()}
                message={authContext.snackbar.message}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
            />
        </React.Fragment>
    );
}

export default withStyles(layoutStyles)(Layout);
