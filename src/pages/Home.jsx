import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import ALL_USERS_QUERY from '../graphql/q/ALL_USERS';
// material-ui
import Snackbar from '@material-ui/core/Snackbar';
// locals
import SubNav from '../comps/SubNav';
import { AuthContext } from '../context/auth';
import { CardContext } from '../context/card';

const Home = props => {
    const authContext = useContext(AuthContext);
    console.log('\n', '\n', `authContext = `, authContext, '\n', '\n');
    const { loading, data } = useQuery(ALL_USERS_QUERY);

    const cardContext = useContext(CardContext);

    let sets = [];
    authContext.user && authContext.user.decks.forEach(deck => {
        deck.list.split('\n').forEach(card => {
            sets.push(card.match(/\((.*)\)/).pop().toLowerCase());
        });
    });

    // TODO: load all sets at Provider instantiation.

    if (loading) return <h1>Loading...</h1>;
    return (
        <div>
            <SubNav {...props} gridDemoData={data && data.feedUsers} />
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
