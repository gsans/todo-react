import React from 'react'
import Todo from './Todo'

export default class TodoList extends React.Component {

  _filterTodos = todo => (
    this.props.filter === 'SHOW_ALL' ||
    this.props.filter === 'SHOW_ACTIVE' && !todo.complete ||
    this.props.filter === 'SHOW_COMPLETED' && todo.complete
  )

  renderTodos () {
    return this.props.todos
      .filter(this._filterTodos)
      .reverse()
      .map(todo =>
        <Todo
          key={todo.id}
          todo={todo}
          toggleTodo={this.props.toggleTodo}
        />
      )
  }

  render () {
    return (
      <ul>
        {this.renderTodos()}
      </ul>
    )
  }
}
