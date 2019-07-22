import React, { forwardRef } from 'react'
import classNames from 'classnames'
import PropTypes from 'lib/proptypes'
import ListItem from './list_item'
import ListLink from './list_link'
import './index.scss'

const List = forwardRef(({
  className,
  compact,
  children,
  ...props
}, ref) => (
  <ul
    ref={ref}
    className={classNames('list', compact && 'list--compact', className)}
    {...props}
  >
    {children}
  </ul>
))

List.propTypes = {
  className: PropTypes.className,
  compact: PropTypes.bool,
}

List.defaultProps = {
  className: undefined,
  compact: false,
}

List.displayName = 'List'

List.Item = ListItem
List.Link = ListLink

export default List
