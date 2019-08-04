import React, { useContext, useState, useEffect } from 'react';
// material-ui
import Grid from '@material-ui/core/Grid';
// locals
import { AuthContext } from '../../context/auth';
import { CardContext } from '../../context/card';
import CardItem from '../CardItem';
// utils
import { useCard } from './utils';

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

    // const finalCard = useCard(deck.list.split('\n')[0]);

    return (
        <>
            {deck && <h2>Deck Title: {deck.title}</h2>}
            {deck && (
                <Grid container spacing={4}>
                    {deck.list.split('\n').map(card => {
                        const set = card.match(/\((.*)\)/).pop().toLowerCase();
                        const cardNumber = card.trim().split(' ').slice(-1).pop();
                        console.log('\n', '\n', `set, cardNumber = `, set, cardNumber, '\n', '\n');
                        const finalCardKey = Object.keys(cardContext[`${set}`])[cardNumber - 1];
                        const finalCard = cardContext[`${set}`][finalCardKey];
                        return (
                            <Grid item key={finalCard.name}>
                                <CardItem {...finalCard} />
                            </Grid>
                        );
                    })}
                </Grid>
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
