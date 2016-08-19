import React from 'react'
import classnames from 'classnames'

export default class FilterLink extends React.Component {

  render () {
    return (
      <a href='#' onClick={() => this.props.setFilter(this.props.type)}
        className={classnames({ inactive: this.props.filter !== this.props.type })}>
        {this.props.children}
      </a>
    )
  }
}
