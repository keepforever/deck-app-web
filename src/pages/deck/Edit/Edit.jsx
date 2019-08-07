import React from 'react';
import DeckNav from '../../../comps/Deck/DeckNav';


function Edit (props) {
    return (
        <div>
            <DeckNav {...props} />
            <h2>Hello Edit</h2>
        </div>
    );
}

export default Edit;
