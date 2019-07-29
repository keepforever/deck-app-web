import React from 'react';

const Deck = ({ deck: { title } }) => {
    return (
        <div>
            <h4>Deck Title: {title}</h4>
        </div>
    );
};

export default Deck;
