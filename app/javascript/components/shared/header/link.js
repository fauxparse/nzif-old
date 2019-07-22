import React from 'react'
import classNames from 'classnames'
import Icon from '../../../atoms/icon'
import { Link } from '../ripple'

const HeaderLink = ({ className, children, ...props }) => (
  <Link className={classNames('link', 'header__link', className)} {...props}>
    {children}
  </Link>
)

const HeaderLinkText = ({ className, children, ...props }) => (
  <span className={classNames('link__text', className)} {...props}>
    {children}
  </span>
)

const HeaderLinkIcon = ({ className, ...props }) => (
  <Icon className={classNames('link__icon', className)} {...props} />
)

HeaderLink.Text = HeaderLinkText
HeaderLink.Icon = HeaderLinkIcon

export default HeaderLink
