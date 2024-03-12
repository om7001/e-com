"use client"

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const GRAPHQL_ENDPOINT = '/api/graphql';

// Create an HTTP link
const httpLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT,
});

// Middleware to set the authorization header if needed
const authLink = setContext((_, { headers }) => {
  // Add your authorization logic here, if applicable
  // const token = localStorage.getItem('accessToken') || '';
  return {
    headers: {
      ...headers,
      // Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create the Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


export default client;