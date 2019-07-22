import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from '../../../atoms/icon'
import Button from '../../../atoms/button'
import Ripple from '../../../effects/ripple'

const MenuButton = forwardRef(({ className, open, children, ...props }, ref) => (
  <Button
    ref={ref}
    className={classNames('menu__button', className)}
    aria-expanded={open || undefined}
    {...props}
  >
    <Ripple />
    {children}
    <Icon className="menu__chevron" name="chevron-down" />
  </Button>
))

MenuButton.propTypes = {
  open: PropTypes.bool,
}

MenuButton.displayName = 'Menu.Button'

export default MenuButton
