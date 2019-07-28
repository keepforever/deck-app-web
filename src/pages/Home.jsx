import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import ALL_USERS_QUERY from '../graphql/q/ALL_USERS';
// locals
import SubNav from '../comps/SubNav';

const Home = props => {
    const { loading, data } = useQuery(ALL_USERS_QUERY);

    if (loading) return <h1>Loading...</h1>;
    return (
        <div>
            <SubNav gridDemoData={data && data.feedUsers} />
        </div>
    );
};

export default Home;
