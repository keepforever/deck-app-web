import React, { useContext, useState, useEffect } from 'react';
// locals
import { AuthContext } from '../../context/auth';
import { CardContext } from '../../context/card';

import CardItem from '../CardItem';
// utils

const Deck = props => {
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

    const context = useContext(AuthContext);
    const cardContext = useContext(CardContext);

    const deck =
        context.user &&
        context.user.decks.filter(d => {
            return d.id === props.match.params.id;
        })[0];

    // deck.list.split('\n').forEach(card => {
    //     sets.push(card.match(/\((.*)\)/).pop().toLowerCase());
    // });

    console.log('\n', '\n', `cardContext = `, cardContext, '\n', '\n');

    return (
        <>
            {deck && (
                <div>
                    <h4>Deck Title: {deck.title}</h4>
                    {deck.list.split('\n').map(card => {
                        return <CardItem key={card.name} {...card} />;
                    })}
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
