import React from 'react'
import classNames from 'classnames'
import PropTypes from 'lib/proptypes'
import Icon from 'atoms/icon'
import Ripple from 'effects/ripple'
import Link from '../link'

const Item = ({ as: Component, className, icon, text, children, ...props }) => (
  <Component className={classNames('menu__item', className)} {...props}>
    <Ripple />
    {icon && <Icon className="menu__icon" name={icon} />}
    {text && <span className="menu__text">{text}</span>}
    {children}
  </Component>
)

Item.propTypes = {
  as: PropTypes.component,
  text: PropTypes.string,
  icon: PropTypes.icon,
}

Item.defaultProps = {
  as: Link,
  icon: null,
}

export default Item
