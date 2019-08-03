import React, { createContext, useReducer } from 'react';
import { loadSetData } from './utils';
import grn from '../assets/sets/grn.json';
import m19 from '../assets/sets/m19.json';
import dar from '../assets/sets/dar.json';
import xln from '../assets/sets/xln.json';
import rna from '../assets/sets/rna.json';

const CardContext = createContext({
    loadSet: set => {}
});

const initialState = {};

// reducer functions
const loadSet = (state, action) => {
    console.log(
        '\n',
        '\n',
        `loadSet reducer Function, action = `,
        action,
        '\n',
        '\n'
    );
    return {
        ...state,
        [action.payload]: {
            ...loadSetData(action.payload)
        }
    };
};

// const hideSnack = (state, action) => {
//     return {
//         ...state,
//         user: {
//             ...state.user
//         },
//         snackbar: {
//             isOpen: false,
//             message: ''
//         }
//     };
// };

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
        grn: { ...grn.cards },
        m19: { ...m19.cards },
        dar: { ...dar.cards },
        xln: { ...xln.cards },
        rna: { ...rna.cards }
    });

    function loadSet (setCode) {
        dispatch({
            type: 'LOAD_SET',
            payload: setCode
        });
    }

    // must return the provider to use elsewhere
    return (
        <CardContext.Provider
            {...props}
            value={{
                ...state,
                loadSet
            }}
        />
    );
}

export { CardContext, CardProvider };
