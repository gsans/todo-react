import gql from 'graphql-tag'

function generateMutationObject (id, complete) {
  return {
    mutation: gql`
      mutation toggleTodo($id: ID!, $complete: Boolean!) {
        updateTodo(id: $id, complete: $complete) { id text complete }
      }`,
    variables: {
      id,
      complete,
    },
    updateQueries: {
      todos: (state, { result, vars }) => {
        console.log('*')
        if (vars.id !== id) {
          return state
        }
        return {
          allTodoes: [...state.todos, result.data.toggleTodo],
        }
      },
    },
  }
}

export function toggleTodo (id, complete) {
  return (dispatch, getState, client) => {
    console.log('making call...')
    client.mutate(generateMutationObject(id, complete)).then(result => {
      console.log('results arrived...')
      if (result.data) {
        return dispatch({
          type: 'RECEIVE_TOGGLE_TODO',
          todo: result.data.updateTodo,
        })
      }
    })
  }
}

// store.dispatch(toggleTodo('cirqibck502i30114ml96byee', false))
