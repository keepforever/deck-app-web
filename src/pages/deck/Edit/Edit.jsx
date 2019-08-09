import React from 'react';
// locals
import DeckNav from '../../../comps/Deck/DeckNav';
// import { getCardNew } from './utils';

function Edit (props) {
    return (
        <div>
            <DeckNav {...props} />
            <h2>Hello Edit</h2>
        </div>
    );
}

export default Edit;
