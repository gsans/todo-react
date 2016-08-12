import React from 'react'
import Todo from './Todo'

export default class TodoList extends React.Component {

  _filterTodos = (todo) => (
    this.props.filter === 'SHOW_ACTIVE'
    ? todo.complete !== true
    : this.props.filter === 'SHOW_COMPLETED'
      ? todo.complete === true
      : true
    )

  renderTodos () {
    return this.props.todos
      .filter(this._filterTodos)
      .reverse()
      .map((todo) =>
        <Todo
          key={todo.id}
          todo={todo}
          toggleTodo={this.props.toggleTodo}
        />
      )
  }

  render () {
    return (
      <section className='main'>
        <ul className='todo-list'>
          {this.renderTodos()}
        </ul>
      </section>
    )
  }
}
