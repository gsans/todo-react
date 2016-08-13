import React from 'react'
import classnames from 'classnames'

export default class Todo extends React.Component {

  state = {
    complete: this.props.todo.complete,
  }

  render () {
    return (
      <li className={classnames({ complete: this.state.complete })}
        onClick={e => {
          this.props.toggleTodo(this.props.todo.id, !this.state.complete)
          this.setState({complete: !this.state.complete})
        }}>
        {this.props.todo.text}
      </li>
    )
  }
}
