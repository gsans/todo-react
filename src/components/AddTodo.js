import React from 'react'

export default class AddTodo extends React.Component {
  _onSubmit () {
    this.props.addTodo(this.input.value)
    this.input.value = ''
  }

  render () {
    return (
      <div>
        <input ref={node => (this.input = node)} />
        <button onClick={e => this._onSubmit()}>
          Add Todo
        </button>
      </div>
    )
  }
}
