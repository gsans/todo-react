import React from 'react'
import { render } from 'react-dom'
import TodoApp from './components/TodoApp'

import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import './style.css'

const networkInterface = createNetworkInterface('https://api.graph.cool/simple/v1/cirpiog0j09jw0156xp6me5wo')

const client = new ApolloClient({
  networkInterface,
})

function filter (state = 'SHOW_ALL', action) {
  if (action.type === 'SET_FILTER') {
    return action.filter
  }
  return state
}

let combinedReducer = combineReducers({
  filter,
  apollo: client.reducer(),
})

const store = compose(
    applyMiddleware(
      client.middleware(),
      thunk.withExtraArgument(client)
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)(combinedReducer)

render(
  <ApolloProvider store={store} client={client}>
    <TodoApp />
  </ApolloProvider>,
  document.getElementById('root')
)
