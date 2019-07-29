import React, { createContext, useReducer } from 'react';

const AuthContext = createContext({
    user: null,
    login: userData => {},
    logout: () => {},
    snackbar: {}
    // snackbar: {
    //     isOpen: false,
    //     message: 'empty message'
    // }
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

const showSnack = (state, action) => {
    return {
        ...state,
        user: {
            ...state.user
        },
        snackbar: {
            isOpen: true,
            message: action.payload
        }
    };
};

const hideSnack = (state, action) => {
    return {
        ...state,
        user: {
            ...state.user
        },
        snackbar: {
            isOpen: false,
            message: ''
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
        case 'SHOW_SNACK':
            return showSnack(state, action);
        case 'HIDE_SNACK':
            return hideSnack(state, action);
        default:
            return state;
    }
}

function AuthProvider (props) {
    // useReducer(reducer, initialState)
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        snackbar: { isOpen: false, message: 'no message' }
    });

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

    function addMessage (message) {
        dispatch({
            type: 'SHOW_SNACK',
            payload: message
        });
    }

    function removeMessage () {
        dispatch({
            type: 'HIDE_SNACK'
        });
    }

    // must return the provider to use elsewhere
    return (
        <AuthContext.Provider
            {...props}
            value={{
                user: state.user,
                snackbar: {
                    ...state.snackbar
                },
                login,
                logout,
                updateUserDecks,
                addMessage,
                removeMessage
            }}
        />
    );
}

export { AuthContext, AuthProvider };
