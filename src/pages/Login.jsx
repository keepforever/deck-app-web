import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import ALL_DECKS_QUERY from '../graphql/q/ALL_DECKS_QUERY';
import ALL_USERS_QUERY from '../graphql/q/ALL_USERS';
// locals
import LoginForm from '../comps/LoginForm/LoginForm';

const Login = props => {
    const { data: dataDeck, loading: loadingDeck } = useQuery(ALL_DECKS_QUERY);
    const { data: dataUser, loading: loadingUser } = useQuery(ALL_USERS_QUERY);
    console.log(`
    #########################################################
                    Login
    #########################################################
    `);

    console.log('\n', '\n', `dataDeck = `, dataDeck, '\n', '\n');
    console.log('\n', '\n', `dataUser = `, dataUser, '\n', '\n');
    console.log(`
    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    #########################################################
    `);
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <LoginForm />
        </div>
    );
};

export default Login;
