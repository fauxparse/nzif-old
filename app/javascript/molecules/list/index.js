import React, { forwardRef } from 'react'
import classNames from 'classnames'
import PropTypes from 'lib/proptypes'
import ListItem from './list_item'
import ListLink from './list_link'
import './index.scss'

const List = forwardRef(({
  className,
  children,
  ...props
}, ref) => (
  <ul ref={ref} className={classNames('list', className)} {...props}>
    {children}
  </ul>
))

List.propTypes = {
  className: PropTypes.className,
}

List.defaultProps = {
  className: undefined,
}

List.displayName = 'List'

List.Item = ListItem
List.Link = ListLink

export default List
