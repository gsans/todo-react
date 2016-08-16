import React from 'react'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import gql from 'graphql-tag'

import AddTodo from './AddTodo'
import TodoList from './TodoList'
import Filters from './Filters'

class TodoApp extends React.Component {

  render () {
    return (
      <div>
        <AddTodo addTodo={this.props.addTodo} />
        <TodoList
          todos={this.props.todos || []}
          filter={this.props.currentFilter}
          toggleTodo={this.props.toggleTodo}
        />
        <Filters setFilter={this.props.setFilter} filter={this.props.currentFilter} />
      </div>
    )
  }
}

const withTodos = graphql(
  gql`query todos {
    allTodoes {
      id
      complete
      text
    }
  }`,
  {
    props: ({ ownProps, data }) => {
      if (data.loading) return { userLoading: true }
      if (data.error) return { hasErrors: true }
      return {
        todos: data.allTodoes,
      }
    },
  }
)
const TodoApp0 = withTodos(TodoApp)

const withAddTodo = graphql(
  gql`mutation addTodo($text: String!) {
    createTodo(text: $text, complete: false) { id }
  }`,
  {
    props: ({ ownProps, mutate }) => ({
      addTodo (text) {
        return mutate({
          variables: { text },
          updateQueries: {
            todos: (state, { mutationResult }) => {
              return {
                allTodoes: [...state.allTodoes, {
                  id: mutationResult.data.createTodo.id,
                  text: text,
                  complete: false,
                }],
              }
            },
          },
        })
      },
    }),
  }
)
const TodoApp1 = withAddTodo(TodoApp0)

const withToggleTodo = graphql(
  gql`mutation toggleTodo($id: ID!, $complete: Boolean!) {
    updateTodo(id: $id, complete: $complete) { id complete }
  }`,
  {
    props: ({ ownProps, mutate }) => ({
      toggleTodo (id, complete) {
        return mutate({
          variables: { id, complete },
          updateQueries: {
            todos: (state, { mutationResult }) => {
              return {
                allTodoes: state.allTodoes.map(t => {
                  if (t.id===id) {
                    return {
                      id: t.id,
                      text: t.text,
                      complete: mutationResult.data.updateTodo.complete,
                    }
                  }
                  return t
                }),
              }
            },
          },
        })
      },
    }),
  }
)
const TodoApp2 = withToggleTodo(TodoApp1)

const TodoAppWithDataAndState = connect(
  (state) => ({ currentFilter: state.filter }),
  (dispatch) => ({
    setFilter: (filter) => {
      dispatch({
        type: 'SET_FILTER',
        filter,
      })
    },
  }),
)(TodoApp2)

export default TodoAppWithDataAndState
