import React from 'react'
import { render } from 'react-dom'
import TodoApp from './components/TodoApp'

import { ApolloProvider } from 'react-apollo'
import { client } from './client'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'

import './style.css'

function filter (state = 'SHOW_ALL', action) {
  if (action.type === 'SET_FILTER') {
    return action.filter
  }
  return state
}

const combinedReducer = combineReducers({
  filter,
  apollo: client.reducer(),
})

const store = compose(
  applyMiddleware(
    client.middleware(),
  ),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)(combinedReducer)

render(
  <ApolloProvider store={store} client={client}>
    <TodoApp />
  </ApolloProvider>,
  document.getElementById('root')
)
