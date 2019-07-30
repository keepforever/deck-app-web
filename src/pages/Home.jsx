import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import ALL_USERS_QUERY from '../graphql/q/ALL_USERS';
// material-ui
import Snackbar from '@material-ui/core/Snackbar';
// locals
import SubNav from '../comps/SubNav';
import { AuthContext } from '../context/auth';

const Home = props => {
    const context = useContext(AuthContext);
    console.log('\n', '\n', `context = `, context, '\n', '\n');
    const { loading, data } = useQuery(ALL_USERS_QUERY);

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
                    vertical: 'top',
                    horizontal: 'right'
                }}
            />
        </div>
    );
};

export default Home;
