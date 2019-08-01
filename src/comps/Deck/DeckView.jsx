import React from 'react';

function DeckView (props) {
    console.log('\n', '\n', `DeckView, props = `, DeckView, props, '\n', '\n');

    return (
        <div>
            <h2>Hello DeckView</h2>
            {props.data.map((c, index) => {
                return <p key={index}>{c.name}</p>;
            })}
        </div>
    );
}

export default DeckView;
