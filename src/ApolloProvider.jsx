import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

const httpLink = createHttpLink({
    uri: 'http://localhost:4000'
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

export default (
    <ApolloProvider client={client}>
        <Router>
            <App />
        </Router>
    </ApolloProvider>
);
