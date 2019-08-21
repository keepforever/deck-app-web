import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from '@apollo/react-hooks';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

const httpLink = createHttpLink({
    uri: 'http://localhost:4000'
});

const authLink = setContext((_, { headers }) => {
    // console.log('\n', `setContext has run `, '\n');
    // get the authentication token from local storage if it exists
    const token =
        localStorage.getItem(process.env.REACT_APP_AUTH_TOKEN_KEY) || '';
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    };
});

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, path }) =>
            console.log(`[GraphQL error]: Message: ${message}, Path: ${path}`)
        );
    }

    if (networkError) {
        console.log(
            `[Network error ${operation.operationName}]: ${
                networkError.message
            }`
        );
    }
});

const client = new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache()
});

export default (
    <ApolloProvider client={client}>
        <Router>
            <App />
        </Router>
    </ApolloProvider>
);
