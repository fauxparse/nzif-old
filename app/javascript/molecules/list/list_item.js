import React from 'react'
import classNames from 'classnames'
import PropTypes from 'lib/proptypes'
import Icon from 'atoms/icon'
import Avatar from 'atoms/avatar'
import './index.scss'

const ListItem = ({
  as: Component,
  className,
  avatar,
  icon,
  secondaryIcon,
  primary,
  secondary,
  children,
  role,
  ...props
}) => (
  <li className={classNames('list-item', className)} role={role || undefined}>
    <Component className="list-item__wrapper" {...props}>
      {avatar && <Avatar className="list-item__avatar" {...avatar} />}
      {icon !== undefined && <Icon className="list-item__icon" name={icon} />}
      <span className="list-item__content">
        {primary && <span className="list-item__primary">{primary}</span>}
        {secondary && <span className="list-item__secondary">{secondary}</span>}
        {children}
      </span>
      {secondaryIcon && (
        <Icon className="list-item__icon list-item__icon--secondary" name={secondaryIcon} />
      )}
    </Component>
  </li>
)

ListItem.propTypes = {
  as: PropTypes.component,
  className: PropTypes.className,
  avatar: PropTypes.shape(Avatar.propTypes),
  icon: PropTypes.icon,
  secondaryIcon: PropTypes.icon,
  primary: PropTypes.string,
  secondary: PropTypes.string,
  role: PropTypes.string,
}

ListItem.defaultProps = {
  as: 'span',
  className: undefined,
  avatar: undefined,
  icon: undefined,
  secondaryIcon: undefined,
  primary: undefined,
  secondary: undefined,
  role: undefined,
}

export default ListItem
