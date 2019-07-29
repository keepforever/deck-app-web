import React, { createContext, useReducer } from 'react';

const AuthContext = createContext({
    user: null,
    login: userData => {},
    logout: () => {}
});

const initialState = {};

const addedDeck = (state, action) => {
    return {
        ...state,
        user: {
            ...state.user,
            decks: [...state.user.decks, action.payload]
        }
    };
};

function authReducer (state = initialState, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: {
                    token: action.payload.token,
                    ...action.payload.user
                }
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null
            };
        case 'ADDED_DECK':
            return addedDeck(state, action);
        default:
            return state;
    }
}

function AuthProvider (props) {
    //                  useReducer(reducer,     initialState)
    const [state, dispatch] = useReducer(authReducer, { user: null });

    function login (userData) {
        dispatch({
            type: 'LOGIN',
            payload: userData
        });
    }

    function logout () {
        dispatch({
            type: 'LOGOUT'
        });
    }

    function updateUserDecks (deckData) {
        dispatch({
            type: 'ADDED_DECK',
            payload: deckData
        });
    }

    // must return the provider to use elsewhere
    return (
        <AuthContext.Provider
            {...props}
            value={{
                user: state.user,
                login,
                logout,
                updateUserDecks
            }}
        />
    );
}

export { AuthContext, AuthProvider };
