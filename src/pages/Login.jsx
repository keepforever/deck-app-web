import React from 'react';
import { useAuth } from 'react-use-auth';
// material-ui
import Button from '@material-ui/core/Button';
// import { useQuery } from '@apollo/react-hooks';
// import ALL_DECKS_QUERY from '../graphql/q/ALL_DECKS_QUERY';
// import ALL_USERS_QUERY from '../graphql/q/ALL_USERS';
// locals
import LoginForm from '../comps/LoginForm';

const AuthZeroLogin = () => {
    const { isAuthenticated, login, logout } = useAuth();
    console.log(`
    #########################################################
                    AuthZeroLogin
    #########################################################
    `);

    console.log('\n', '\n', `isAuthenticated = `, isAuthenticated, '\n', '\n');

    console.log(`
    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    #########################################################
    `);
    if (isAuthenticated()) {
        return <Button onClick={logout}>Logout</Button>;
    } else {
        return <Button onClick={login}>Login</Button>;
    }
};

const Login = props => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'cornsilk'
            }}>
                <AuthZeroLogin />
            </div>
            <LoginForm {...props} />
        </div>
    );
};

export default Login;
