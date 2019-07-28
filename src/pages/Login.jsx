import React from 'react';
// import { useQuery } from '@apollo/react-hooks';
// import ALL_DECKS_QUERY from '../graphql/q/ALL_DECKS_QUERY';
// import ALL_USERS_QUERY from '../graphql/q/ALL_USERS';
// locals
import LoginForm from '../comps/LoginForm/LoginForm';

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
            <LoginForm {...props}/>
        </div>
    );
};

export default Login;
