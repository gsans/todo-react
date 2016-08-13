import React from 'react'
import FilterLink from './FilterLink'

export default class Filters extends React.Component {

  render () {
    return (
      <div>
        Show: {' '}
        <FilterLink selected={this.props.filter} filter={'SHOW_ALL'} setFilter={this.props.setFilter}>
          All
        </FilterLink>{', '}
        <FilterLink selected={this.props.filter} filter={'SHOW_ACTIVE'} setFilter={this.props.setFilter}>
          Active
        </FilterLink>{', '}
        <FilterLink selected={this.props.filter} filter={'SHOW_COMPLETED'} setFilter={this.props.setFilter}>
          Completed
        </FilterLink>
      </div>
    )
  }
}
