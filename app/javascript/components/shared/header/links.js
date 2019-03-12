import React, { forwardRef } from 'react'
import classNames from 'classnames'
import Menu from '../menu'

const HeaderLinks = forwardRef(({ className, children, ...props }, ref) => (
  <Menu.Content ref={ref} className={classNames('header__links', className)} {...props}>
    {children}
  </Menu.Content>
))

HeaderLinks.displayName = 'HeaderLinks'

export default HeaderLinks
