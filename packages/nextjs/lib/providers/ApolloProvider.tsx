import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql
  } from "@apollo/client"
  import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev"
  // import { relayStylePagination } from "@apollo/client/utilities"
  
  
  export const GRAPH_ENDPOINT_URL = "https://aura-production-c3e7.up.railway.app/"
  export const APOLLO_CLIENT = new ApolloClient({
    uri: GRAPH_ENDPOINT_URL,
    cache: new InMemoryCache({
      // typePolicies: {
      //   Query: {
      //     fields: {
      //       tokens: relayStylePagination(),
      //     },
      //   },
      // },
    })
  })
  
  if (process.env.NODE_ENV != "production") {
    // Adds messages only in a dev environment
    loadDevMessages()
    loadErrorMessages()
  }
  
  export function GraphQlProvider({ children }: { children: React.ReactNode }) {
    return <ApolloProvider client={APOLLO_CLIENT}>{children}</ApolloProvider>
  }
  