import React, { forwardRef } from 'react'
import classNames from 'classnames'
import Button from 'atoms/button'
import Icon from 'atoms/icon'

const MenuButton = forwardRef(({ className, children, ...props }, ref) => (
  <Button ref={ref} className={classNames('menu__button', className)} {...props}>
    {children}
    <Icon className="button__icon menu__chevron" name="chevron-down" />
  </Button>
))

MenuButton.displayName = 'Menu.Button'

export default MenuButton
