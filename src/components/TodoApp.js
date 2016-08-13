import React from 'react'
import Filters from './Filters'
import AddTodo from './AddTodo'
import TodoList from './TodoList'
import gql from 'graphql-tag'

import { connect } from 'react-apollo'

class TodoApp extends React.Component {

  render () {
    return (
      <div>
        <AddTodo addTodo={this.props.mutations.addTodo} refetch={this.props.todos.refetch} />
        <TodoList
          todos={this.props.todos.allTodoes || []}
          filter={this.props.filter}
          toggleTodo={this.props.mutations.toggleTodo}
        />
        <Filters setFilter={this.props.setFilter} filter={this.props.filter} refetch={this.props.todos.refetch} />
      </div>
    )
  }
}

const TodoAppLinked = connect({
  mapStateToProps (state) {
    return {
      filter: state.filter,
    }
  },
  mapDispatchToProps (dispatch) {
    return {
      setFilter: (filter) => {
        dispatch({
          type: 'SET_FILTER',
          filter,
        })
      },
    }
  },
  mapMutationsToProps () {
    return {
      addTodo: (text) => ({
        mutation: gql`
          mutation addTodo($text: String!) {
            createTodo(text: $text, complete: false) { id }
          }`,
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
      }),
      toggleTodo: (id, complete) => ({
        mutation: gql`
          mutation toggleTodo($id: ID!, $complete: Boolean!) {
            updateTodo(id: $id, complete: $complete) { id complete }
          }`,
        variables: {
          id,
          complete,
        },
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
      }),
    }
  },
  mapQueriesToProps () {
    return {
      todos: {
        query: gql`
          query todos {
            allTodoes {
              id
              complete
              text
            }
          }
        `,
        forceFetch: false,
      },
    }
  },
})(TodoApp)

export default TodoAppLinked
