import React from 'react';
import DeckNav from '../../../comps/Deck/DeckNav';
// locals
import { useDeck } from './utils';

function Edit (props) {
    const [deck, deckListString] = useDeck(props.match.params.id);
    deck && console.log('\n', '\n', `EDIT, deck = `, deck, '\n', '\n');
    console.log('\n', '\n', `deckListString = `, deckListString, '\n', '\n');

    return (
        <div>
            <DeckNav {...props} />
            <h2>Hello Edit</h2>
        </div>
    );
}

export default Edit;
