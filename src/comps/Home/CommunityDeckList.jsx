import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import ALL_DECKS_QUERY from '../../graphql/q/ALL_DECKS_QUERY';
import CircularProgress from '@material-ui/core/CircularProgress';

import DeckList from '../Home/DecksList';



const CommunityDeckList = props => {

    const { loading, data: { feedDecks: decks } } = useQuery(ALL_DECKS_QUERY);
    console.log('\n', '\n', `CommunityDecksList, decks = `, decks, '\n', '\n');

    if (loading) return <CircularProgress />

    console.log('\n', '\n', `ComunityDeckList, props = `, props, '\n', '\n');
    return (
        <div>
            <h3>Hello CommunityDeckList</h3>
            <DeckList decks={decks} />
        </div>
    );
};

export default CommunityDeckList;
