import React, { createContext, useReducer } from 'react';
import { loadSetData } from './utils';

import ana from '../assets/sets/ana.json';
import dar from '../assets/sets/dar.json';
import g18 from '../assets/sets/g18.json';
import grn from '../assets/sets/grn.json';
import m19 from '../assets/sets/m19.json';
import m20 from '../assets/sets/m20.json';
import rix from '../assets/sets/rix.json';
import rna from '../assets/sets/rna.json';
import war from '../assets/sets/war.json';
import xln from '../assets/sets/xln.json';
// new dictionary
import dict from '../assets/cardDictionary.json';

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
        ana: { ...ana.cards },
        dar: { ...dar.cards },
        g18: { ...g18.cards },
        grn: { ...grn.cards },
        m19: { ...m19.cards },
        m20: { ...m20.cards },
        rix: { ...rix.cards },
        rna: { ...rna.cards },
        war: { ...war.cards },
        xln: { ...xln.cards },
        dict: { ...dict }
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
