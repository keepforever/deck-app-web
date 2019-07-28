import React, { createContext, useReducer } from 'react';

const AuthContext = createContext({
    user: null,
    login: userData => {},
    logout: () => {}
});

const initialState = {};

function authReducer (state = initialState, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null
            };
        default:
            return state;
    }
};

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

    // must return the provider to use elsewhere
    return (
        <AuthContext.Provider
            {...props}
            value={{
                user: state.user,
                login,
                logout
            }}
        />
    );
};

export { AuthContext, AuthProvider };
