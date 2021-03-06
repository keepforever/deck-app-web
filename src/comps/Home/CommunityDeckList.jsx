import React from 'react';
import { useQuery } from '@apollo/react-hooks';
// material-ui
import CircularProgress from '@material-ui/core/CircularProgress';
// locals
import ALL_DECKS_QUERY from '../../graphql/q/ALL_DECKS_QUERY';
import DeckList from '../Home/DecksList';

const CommunityDeckList = props => {
    const {
        loading,
        data: { feedDecks: decks }
        // fetchMore
    } = useQuery(ALL_DECKS_QUERY, {
        fetchPolicy: 'cache-and-network'
    });
    // console.log('\n', '\n', `CommunityDecksList, decks = `, decks, '\n', '\n');

    if (loading) return <CircularProgress />;

    // console.log('\n', '\n', `ComunityDeckList, props = `, props, '\n', '\n');
    return (
        <div>
            <DeckList history={props.history} decks={decks} />
        </div>
    );
};

export default CommunityDeckList;
