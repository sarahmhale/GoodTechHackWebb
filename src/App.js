import React, { Component } from 'react';
import Map from './Map'

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  link: new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjdzsmim2332t0175wp40g39p' }),
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
