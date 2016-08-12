import React from 'react'
import classnames from 'classnames'

export default class Filters extends React.Component {

  render () {
    return (
      <p>
        Show: {' '}
        <a href='#' onClick={() => this.props.setFilter('SHOW_ALL')}
          className={classnames({ inactive: this.props.filter !== 'SHOW_ALL' })}>
          All
        </a>{', '}
        <a href='#' onClick={() => this.props.setFilter('SHOW_ACTIVE')}
          className={classnames({ inactive: this.props.filter !== 'SHOW_ACTIVE' })}>
          Active
        </a>{', '}
        <a href='#' onClick={() => this.props.setFilter('SHOW_COMPLETED')}
          className={classnames({ inactive: this.props.filter !== 'SHOW_COMPLETED' })}>
          Completed
        </a>
      </p>
    )
  }
}
