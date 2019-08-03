import React, { createContext, useReducer } from 'react';
import { loadSetData } from './utils';

const CardContext = createContext({
    loadSet: set => {}
});

const initialState = {};

// reducer functions
const loadSet = (state, action) => {
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
        user: null,
        snackbar: { isOpen: false, message: 'no message' }
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
