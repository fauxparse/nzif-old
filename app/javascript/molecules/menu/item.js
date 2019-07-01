import React from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import List from 'molecules/list'

const MenuItem = ({ as: Component, className, children, ...props }) => (
  <Component
    className={classNames('menu__item', className)}
    role="none"
    tabIndex={-1}
    {...props}
  >
    {children}
  </Component>
)

MenuItem.propTypes = {
  as: PropTypes.component,
}

MenuItem.defaultProps = {
  as: List.Item,
}

export default MenuItem
