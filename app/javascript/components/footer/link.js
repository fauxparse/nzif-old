import React from 'react'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import CommonProps from '../../lib/common_props'
import Icon from '../../atoms/icon'

const FooterLink = ({ icon, className, children, ...props }) => (
  <NavLink
    className={classNames('link footer__link', className)}
    activeClassName="footer__link--active"
    {...props}
  >
    {icon && <Icon name={icon} className="link__icon" />}
    <span className="link__text">{children}</span>
  </NavLink>
)

FooterLink.propTypes = {
  icon: CommonProps.icon,
}

export default FooterLink
