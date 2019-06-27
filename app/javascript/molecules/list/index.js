import React from 'react'
import classNames from 'classnames'
import PropTypes from 'lib/proptypes'
import ListItem from './list_item'
import ListLink from './list_link'
import './index.scss'

const List = ({
  className,
  children,
  ...props
}) => (
  <ul className={classNames('list', className)} {...props}>
    {children}
  </ul>
)

List.propTypes = {
  className: PropTypes.className,
}

List.defaultProps = {
  className: undefined,
}

List.Item = ListItem
List.Link = ListLink

export default List
