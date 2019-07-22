import React from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import List from 'molecules/list'
import MenuItem from './item'

const MenuLink = ({ as: Component, className, children, ...props }) => (
  <MenuItem
    as={Component}
    className={classNames('menu__item--link', className)}
    {...props}
  >
    {children}
  </MenuItem>
)

MenuLink.propTypes = {
  as: PropTypes.component,
}

MenuLink.defaultProps = {
  as: List.Link,
}

export default MenuLink
