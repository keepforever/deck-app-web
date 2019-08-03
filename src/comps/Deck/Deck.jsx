import React, { useContext, useState, useEffect } from 'react';
// locals
import { AuthContext } from '../../context/auth';
// utils

const Deck = (props) => {
    const context = useContext(AuthContext);

    const deck =
        context.user &&
        context.user.decks.filter(d => {
            return d.id === props.match.params.id;
        })[0];

    console.log(`
    #########################################################
                    Deck
    #########################################################
    `);
    console.log('\n', '\n', `props = `, props, '\n', '\n');
    console.log(`
    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    #########################################################
    `);

    return (
        <>
            {deck && (
                <div>
                    <h4>Deck Title: {deck.title}</h4>
                    <p>The rest</p>
                </div>
            )}
        </>
    );
};

export default Deck;

// import { buildUrlArray } from './utils';
// import { useMultipleFetch } from '../../hooks/useMultipleFetch';

// const { data } = useFetch(1);

// USE MULTIPLE FETCH
// const [data, isLoadings] = useMultipleFetch([1, 2, 3]);
// useEffect(
//     () => {
//         console.log('\n', '\n', `useEffectFired = `, '\n', '\n');
//         setDeckState(data);
//     },
//     [data]
// );

// deck && buildUrlArray(deck.list);
