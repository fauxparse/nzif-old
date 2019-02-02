import React from 'react'
import classNames from 'classnames'
import Icon from '../../icons'
import Ripple from '../ripple'

const Button = React.forwardRef(({ className, open, children, ...props }, ref) => (
  <Ripple
    ref={ref}
    className={classNames('menu__button', className)}
    aria-expanded={open || undefined}
    {...props}
  >
    {children}
    <Icon className="menu__chevron" name="chevron-down" />
  </Ripple>
))

export default Button
