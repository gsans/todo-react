import ApolloClient, { createNetworkInterface } from 'apollo-client'

const networkInterface = createNetworkInterface('https://api.graph.cool/simple/v1/cirpiog0j09jw0156xp6me5wo')
export const client = new ApolloClient({
  networkInterface,
})
