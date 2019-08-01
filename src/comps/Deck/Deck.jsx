import React, { useContext, useState, useEffect } from 'react';
// locals
import DeckView from './DeckView';
import { AuthContext } from '../../context/auth';
// utils
import { buildUrlArray } from './utils';
import { useMultipleFetch } from '../../hooks/useMultipleFetch';

const Deck = ({ match: { params } }) => {
    const context = useContext(AuthContext);
    const [deckState, setDeckState] = useState([]);

    const deck =
        context.user &&
        context.user.decks.filter(d => {
            return d.id === params.id;
        })[0];

    // const { data } = useFetch(1);

    const [data, isLoadings] = useMultipleFetch([1, 2, 3]);

    useEffect(
        () => {
            console.log('\n', '\n', `useEffectFired = `, '\n', '\n');
            setDeckState(data);
        },
        [data]
    );

    console.log(`
    #########################################################
                    Deck
    #########################################################
    `);
    // console.log('\n', '\n', `deck = `, deck, '\n', '\n');
    deck && buildUrlArray(deck.list);
    console.log('\n', `typeof deckState = `, typeof deckState, '\n');

    console.log('\n', '\n', `data = `, data, '\n', '\n');
    console.log('\n', '\n', ` isLoadings = `, isLoadings, '\n', '\n');

    console.log(`
    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    #########################################################
    `);

    console.log(
        '\n',
        `isLoadings.every(el => el === false) = `,
        isLoadings.every(el => el === false),
        '\n'
    );

    console.log('\n', '\n', `data.length = `, data.length, '\n', '\n');

    return (
        <div>
            <h4>Deck Title: {deck && deck.title}</h4>
            <DeckView data={data} />
        </div>
    );
};

export default Deck;
