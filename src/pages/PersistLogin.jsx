import React, { useContext, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
// material-ui
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
// locals
import { AuthContext } from '../context/auth';
import REFRESH_TOKEN_MUTATION from '../graphql/m/REFRESH_TOKEN_MUTATION';
import ME_QUERY from '../graphql/q/ME_QUERY';

const PersistLogin = props => {
    const authContext = useContext(AuthContext);
    const [refreshTokenMutation, { loading: refreshLoading }] = useMutation(
        REFRESH_TOKEN_MUTATION,
        {
            update: (_, { data: { login: loginData } }) => {
                authContext.addMessage('Refresh Success!');
            }
        }
    );

    // REFRESH TOKEN USE EFFECT
    useEffect(() => {
        const token = window.localStorage.getItem(
            process.env.REACT_APP_AUTH_TOKEN_KEY
        );
        console.log('\n', '\n', `useEffect, token = `, token, '\n', '\n');
        refreshTokenMutation();
    }, []);

    const { loading: meLoading, data: meData } = useQuery(ME_QUERY, {
        onCompleted: data => {
            authContext.persistLogin({
                user: { ...meData.me },
                token: window.localStorage.getItem(
                    process.env.REACT_APP_AUTH_TOKEN_KEY
                )
            });
            props.history.push('/home');
            console.log(
                '\n',
                '\n',
                `onCompleted ME_QUERY = `,
                data,
                '\n',
                '\n'
            );
        },
        onError: error => {
            console.log(
                '\n',
                '\n',
                `PersistLogin.jsx, ME_QUERY error = `,
                error,
                '\n',
                '\n'
            );
        },
        fetchPolicy: 'cache-and-network'
    });

    if (meLoading || refreshLoading) return <CircularProgress size={80} />;

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

// useEffect(() => {
//     if (!meLoading && !refreshLoading) {
//         console.log(`
//         #########################################################
//                         last useEffect
//         #########################################################
//         `);

//         console.log('\n', '\n', `meData = `, meData, '\n', '\n');
//         console.log(`
//         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//         #########################################################
//         `);
//         console.log(
//             '\n',
//             '\n',
//             `persistDispatchCount = `,
//             persistDispatchCount.current,
//             '\n',
//             '\n'
//         );

//         if (persistDispatchCount.current < 1) {
//             console.log('\n', `XX persistLogin XX `, '\n');
//             ++persistDispatchCount.current;
//             authContext.persistLogin({
//                 user: { ...meData.me },
//                 token: window.localStorage.getItem(
//                     process.env.REACT_APP_AUTH_TOKEN_KEY
//                 )
//             });
//             props.history.push('/home');
//         }
//     }
// }, [meData]);
