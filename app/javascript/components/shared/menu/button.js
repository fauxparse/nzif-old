import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from '../../../atoms/icon'
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

Button.propTypes = {
  open: PropTypes.bool,
}

Button.displayName = 'Menu.Button'

export default Button
