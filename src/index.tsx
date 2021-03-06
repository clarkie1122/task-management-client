import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import { BrowserRouter } from 'react-router-dom';

import { resolvers, typeDefs } from './graphql/resolvers';
import { default as data } from './graphql/initial-data';

const httpLink = createHttpLink({
    uri: 'http://localhost:3000/graphql'
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const cache = new InMemoryCache();

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    typeDefs,
    resolvers
});
client.writeData({ data });

ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ApolloProvider>
    ,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
