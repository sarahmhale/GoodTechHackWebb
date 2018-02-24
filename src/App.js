import React, { Component } from 'react';
import Map from './Map'

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `wss://subscriptions.graph.cool/v1/cjdzsmim2332t0175wp40g39p`,
  options: {
    reconnect: true
  }
});

// Create an http link:
const httpLink = new HttpLink({
  uri: 'https://api.graph.cool/simple/v1/cjdzsmim2332t0175wp40g39p'
});


// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);


const client = new ApolloClient({
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  link,
  cache: new InMemoryCache()
});

export default class App extends Component {

  render() {
      return (
        <ApolloProvider client={client}>
          <Map/>
        </ApolloProvider>
      );
  }
}
