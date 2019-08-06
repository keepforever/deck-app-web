import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import ALL_USERS_QUERY from '../graphql/q/ALL_USERS';
// material-ui
import Snackbar from '@material-ui/core/Snackbar';
// locals
import SubNav from '../comps/SubNav';
import { AuthContext } from '../context/auth';
import DeckList from '../comps/Home/DeckList';
// import { CardContext } from '../context/card';

const Home = props => {
    const authContext = useContext(AuthContext);
    if (!authContext.user) return <Redirect to="/login" />;

    // const { loading, data } = useQuery(ALL_USERS_QUERY);
    // if (loading) return <h1>Loading...</h1>;
    console.log(
        '\n',
        '\n',
        `authContext.user = `,
        authContext.user,
        '\n',
        '\n'
    );

    const {
        user: { name, arenaHandle }
    } = authContext;

    return (
        <div>
            {/* <SubNav {...props} gridDemoData={data && data.feedUsers} /> */}
            <h1>Welcome {name}</h1>
            <h4>Handle: {arenaHandle}</h4>

            <DeckList decks={authContext.user.decks} />

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
