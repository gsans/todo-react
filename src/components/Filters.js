import React from 'react'
import FilterLink from './FilterLink'

export default class Filters extends React.Component {

  render () {
    return (
      <div>
        Show: {' '}
        <FilterLink type={'SHOW_ALL'} {...this.props}>
          All
        </FilterLink>{', '}
        <FilterLink type={'SHOW_ACTIVE'} {...this.props}>
          Active
        </FilterLink>{', '}
        <FilterLink type={'SHOW_COMPLETED'} {...this.props}>
          Completed
        </FilterLink>
      </div>
    )
  }
}
