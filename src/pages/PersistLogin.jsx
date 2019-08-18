import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
// material-ui
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
// locals
import { AuthContext } from '../context/auth';
import REFRESH_TOKEN_MUTATION from '../graphql/m/REFRESH_TOKEN_MUTATION';

const PersistLogin = props => {
    const authContext = useContext(AuthContext);
    const [refreshTokenMutation, { loading }] = useMutation(
        REFRESH_TOKEN_MUTATION,
        {
            update: (_, { data: { login: loginData } }) => {
                // authContext.login(loginData);
                authContext.addMessage('Refresh Success!');
                // props.history.push('/home');
            },
            onCompleted: data => {
                // data.login.token
                console.log(`
            #########################################################
                            PersistLogin.jsx, Refresh onCompleted
            #########################################################
            `);
                console.log('\n', '\n', `data = `, data, '\n', '\n');

                console.log(`
            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
            #########################################################
            `);
            }
        }
    );

    useEffect(() => {
        const token = window.localStorage.getItem(
            process.env.REACT_APP_AUTH_TOKEN_KEY
        );
        console.log('\n', '\n', `useEffect, token = `, token, '\n', '\n');
        refreshTokenMutation();
    }, []);

    // if (!loading) return <Redirect to="/home" />;

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                maxWidth: '870px',
                margin: 'auto',
                width: '90vw',
                height: '90vh'
            }}
        >
            <CircularProgress />
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
        </div>
    );
};

export default PersistLogin;
