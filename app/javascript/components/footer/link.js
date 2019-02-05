import React from 'react'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import Icon from '../icons'

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

export default FooterLink
