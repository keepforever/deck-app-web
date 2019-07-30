import React, { useContext } from 'react';
// locals
import { AuthContext } from '../../context/auth';
// utils
import { buildUrlArray, getCards } from './utils';

const Deck = ({ match: { params } }) => {
    const context = useContext(AuthContext);

    const deck =
        context.user &&
        context.user.decks.filter(d => {
            return d.id === params.id;
        })[0];
    console.log(`
    #########################################################
                    Deck
    #########################################################
    `);
    console.log('\n', '\n', `deck = `, deck, '\n', '\n');
    deck && buildUrlArray(deck.list);
    getCards();
    console.log(`
    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    #########################################################
    `);
    return (
        <div>
            <h4>Deck Title: {deck && deck.title}</h4>
        </div>
    );
};

export default Deck;
