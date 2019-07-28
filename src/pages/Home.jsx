import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import ALL_USERS_QUERY from '../graphql/q/ALL_USERS';
// locals
import GridDemo from '../comps/GridDemo';
import TabNavigationWithRoutes from '../comps/TabNavigationWithRoutes';

const Home = props => {
    const { loading, data } = useQuery(ALL_USERS_QUERY);
    console.log(`
    #########################################################
                    Home
    #########################################################
    `);

    console.log('\n', '\n', `props = `, props, '\n', '\n');

    console.log('\n', '\n', `loading = `, loading, '\n', '\n');
    console.log('\n', '\n', `data = `, data, '\n', '\n');

    console.log(`
    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    #########################################################
    `);
    return (
        <div>
            <TabNavigationWithRoutes />
            <div style={{ padding: '30px' }}>
                {data && data.feedUsers && <GridDemo users={data.feedUsers} />}
            </div>
        </div>
    );
};

export default Home;
