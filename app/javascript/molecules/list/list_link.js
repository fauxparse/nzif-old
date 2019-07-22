import React from 'react'
import PropTypes from 'lib/proptypes'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import Ripple from 'effects/ripple'
import ListItem from './list_item'

const ListLink = ({
  active,
  className,
  children,
  ...props,
}) => (
  <ListItem
    as={Link}
    className={classNames('list-item--link', className)}
    aria-selected={active || undefined}
    {...props}
  >
    <Ripple />
    {children}
  </ListItem>
)

ListLink.propTypes = {
  active: PropTypes.bool,
}

ListLink.defaultProps = {
  active: undefined,
}

export default ListLink
