import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
// material-ui
import Snackbar from '@material-ui/core/Snackbar';
// locals
import { AuthContext } from '../context/auth';
import DecksList from '../comps/Home/DecksList';
import CommunityDeckList from '../comps/Home/CommunityDeckList';
// import { CardContext } from '../authContext/card';

const Home = props => {
    const authContext = useContext(AuthContext);

    if (!authContext.user) return <Redirect to="/login" />;

    const {
        user: { name, arenaHandle, decks = [] }
    } = authContext;

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                maxWidth: '870px',
                margin: 'auto'
            }}
        >
            <h1>Welcome {name}</h1>
            <h4>Handle: {arenaHandle}</h4>

            {!!decks.length && (
                <div>
                    <h4>You're Decks</h4>
                    <DecksList decks={authContext.user.decks} />
                </div>
            )}

            <h4>Community Decks</h4>
            <CommunityDeckList history={props.history} />

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

export default Home;

// const [refreshTokenMutation, { loading }] = useMutation(
//     REFRESH_TOKEN_MUTATION,
//     {
//         update: (_, { data: { login: loginData } }) => {
//             // authContext.login(loginData);
//             authContext.addMessage('Refresh Success!');
//             // props.history.push('/home');
//         },
//         onCompleted: data => {
//             // data.login.token
//             console.log(`
//             #########################################################
//                             Refresh_Token_Mutation, onCompleted
//             #########################################################
//             `);
//             console.log('\n', '\n', `data = `, data, '\n', '\n');

//             console.log(`
//             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//             #########################################################
//             `);
//         }
//     }
// );
// console.log(
//     '\n',
//     '\n',
//     `Home, RefreshMutation, loading = `,
//     loading,
//     '\n',
//     '\n'
// );
// useEffect(() => {
//     const token = window.localStorage.getItem(
//         process.env.REACT_APP_AUTH_TOKEN_KEY
//     );
//     console.log('\n', '\n', `useEffect, token = `, token, '\n', '\n');
//     refreshTokenMutation();
// }, []);
