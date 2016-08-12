import React from 'react'
import Filters from './Filters'
import AddTodo from './AddTodo'
import TodoList from './TodoList'
import gql from 'graphql-tag'
import { toggleTodo } from './AsyncActions'

import { connect } from 'react-apollo'

class TodoApp extends React.Component {

  render () {
    return (
      <div>
        <AddTodo addTodo={this.props.mutations.addTodo} refetch={this.props.todos.refetch} />
        <TodoList
          todos={this.props.todos.allTodoes || []}
          filter={this.props.filter}
          toggleTodo={this.props.toggleTodo}
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
      toggleTodo: (id, complete) => {
        dispatch(toggleTodo(id, complete))
      },
    }
  },
  mapMutationsToProps () {
    return {
      addTodo: (text) => ({
        mutation: gql`
          mutation addTodo($text: String!) {
            createTodo(complete: false, text: $text) { id text complete }
          }
        `,
        variables: { text },
      }),
      /*toggleTodo: (id, complete) => ({
        mutation: gql`
          mutation toggleTodo($id: ID!, $complete: Boolean!) {
            updateTodo(id: $id, complete: $complete) { id text complete }
          }
        `,
        variables: {
          id,
          complete,
          },
        },
      }),*/
    }
  },
  mapQueriesToProps () {
    return {
      todos: {
        query: gql`
          {
            allTodoes {
              id
              complete
              text
            }
          }
        `,
        forceFetch: false,
        //pollInterval: 1000,
      },
    }
  },
})(TodoApp)

export default TodoAppLinked
