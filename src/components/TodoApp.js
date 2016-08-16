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
          todos={this.props.data.allTodoes || []}
          filter={this.props.currentFilter}
          toggleTodo={this.props.toggleTodo}
        />
        <Filters setFilter={this.props.setFilter} filter={this.props.currentFilter} />
      </div>
    )
  }
}

// currentFilter state
function mapDispatchToProps (dispatch) {
  return {
    setFilter: (filter) => {
      dispatch({
        type: 'SET_FILTER',
        filter,
      })
    },
  }
};

function mapStateToProps (state) {
  return {
    currentFilter: state.filter,
  }
}

const withRedux = connect(mapStateToProps, mapDispatchToProps)
const withTodos = graphql(gql`
    query todos {
      allTodoes {
        id
        complete
        text
      }
    }
  `, {
    options: () => ({ forceFetch: true }),
  }
)

const withAddTodo = graphql(gql`
  mutation addTodo($text: String!) {
    createTodo(text: $text, complete: false) { id }
  }`, {
    props: ({ mutate }) => ({
      addTodo: (text) => mutate({
        variables: { text },
        updateQueries: {
          todos: (state, { mutationResult }) => ({
            allTodoes: [...state.allTodoes, {
              id: mutationResult.data.createTodo.id,
              text: text,
              complete: false,
            }],
          }),
        },
      }),
    }),
  }
)

const withToggleTodo = graphql(gql`
  mutation toggleTodo($id: ID!, $complete: Boolean!) {
    updateTodo(id: $id, complete: $complete) { id complete }
  }`, {
    props: ({ mutate }) => ({
      toggleTodo: (id, complete) => ({
        variables: {
          id,
          complete,
        },
        updateQueries: {
          todos: (state, { mutationResult }) => {
            return {
              allTodoes: state.allTodoes.map(t => {
                if (t.id === id) {
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
    }),
  }
)

const TodoAppLinked = withRedux(withTodos(withAddTodo(withToggleTodo(TodoApp))))

export default TodoAppLinked
