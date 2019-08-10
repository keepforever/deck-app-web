import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
// material-ui
import Snackbar from '@material-ui/core/Snackbar';
// locals
import { AuthContext } from '../context/auth';
import DecksList from '../comps/Home/DecksList';
// import { CardContext } from '../context/card';

const Home = props => {
    const authContext = useContext(AuthContext);
    if (!authContext.user) return <Redirect to="/login" />;

    // const { loading, data } = useQuery(ALL_USERS_QUERY);
    // if (loading) return <h1>Loading...</h1>;
    console.log('\n', '\n', `authContext.user = `, authContext.user, '\n', '\n');

    const {
        user: { name, arenaHandle }
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
            {/* <SubNav {...props} gridDemoData={data && data.feedUsers} /> */}
            <h1>Welcome {name}</h1>
            <h4>Handle: {arenaHandle}</h4>

            <DecksList decks={authContext.user.decks} />

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
