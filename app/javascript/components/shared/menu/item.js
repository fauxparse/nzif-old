import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import CommonProps from '../../../lib/common_props'
import Icon from '../../../atoms/icon'
import { Link } from '../ripple'

const Item = ({ as: Component, className, icon, text, children, ...props }) => (
  <Component className={classNames('menu__item', className)} {...props}>
    {icon && <Icon className="menu__icon" name={icon} />}
    {text && <span className="menu__text">{text}</span>}
    {children}
  </Component>
)

Item.propTypes = {
  as: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.func.isRequired,
    PropTypes.symbol.isRequired,
  ]),
  text: PropTypes.string,
  icon: CommonProps.icon,
}

Item.defaultProps = {
  as: Link,
  icon: null,
}

export default Item
