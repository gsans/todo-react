import React from 'react'
import classnames from 'classnames'

export default class FilterLink extends React.Component {

  render () {
    return (
      <a href='#' onClick={() => this.props.setFilter(this.props.filter)}
        className={classnames({ inactive: this.props.selected !== this.props.filter })}>
        {this.props.children}
      </a>
    )
  }
}
