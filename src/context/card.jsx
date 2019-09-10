import React, { createContext, useReducer } from 'react';

// new dictionary
import dict from '../assets/cardDictionary.json';

const CardContext = createContext({
    loadSet: set => {}
});

const initialState = {};

// reducer functions
const loadSet = (state, action) => {
    return {
        ...state,
        [action.payload]: {
            foo: 'bar'
        }
    };
};

function cardReducer (state = initialState, action) {
    switch (action.type) {
        case 'LOAD_SET':
            return loadSet(state, action);
        default:
            return state;
    }
}

function CardProvider (props) {
    // useReducer(reducer, initialState)
    const [state, dispatch] = useReducer(cardReducer, {
        dict: { ...dict }
    });

    console.log('\n', '\n', `dispatch = `, dispatch, '\n', '\n');

    // must return the provider to use elsewhere
    return (
        <CardContext.Provider
            {...props}
            value={{
                ...state
            }}
        />
    );
}

export { CardContext, CardProvider };
