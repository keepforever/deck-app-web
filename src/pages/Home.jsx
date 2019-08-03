import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import ALL_USERS_QUERY from '../graphql/q/ALL_USERS';
// material-ui
import Snackbar from '@material-ui/core/Snackbar';
// locals
import SubNav from '../comps/SubNav';
import { AuthContext } from '../context/auth';
// data
import AnaSet from '../assets/sets/ana.json';
import DarSet from '../assets/sets/dar.json';

const Home = props => {
    const context = useContext(AuthContext);
    // console.log('\n', '\n', `context = `, context, '\n', '\n');
    const { loading, data } = useQuery(ALL_USERS_QUERY);

    const combineSets = {
        ...AnaSet,
        ...DarSet
    };

    console.log('\n', '\n', `combineSets = `, combineSets, '\n', '\n');

    if (loading) return <h1>Loading...</h1>;
    return (
        <div>
            <SubNav {...props} gridDemoData={data && data.feedUsers} />
            <Snackbar
                open={context.snackbar.isOpen}
                autoHideDuration={2000}
                onClose={() => context.removeMessage()}
                message={context.snackbar.message}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
            />
        </div>
    );
};

export default Home;
