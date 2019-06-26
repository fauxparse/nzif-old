import React, { forwardRef, useRef } from 'react'
import classNames from 'classnames'
import PropTypes from 'lib/proptypes'
import Ripple from 'effects/ripple'
import Text from './text'
import Icon from './icon'
import './index.scss'

const Button = forwardRef(({
  className,
  as: Component = 'button',
  text,
  icon,
  children,
  primary,
  ...props
}, ref) => {
  const classes = classNames(
    'button',
    className,
    {
      'button--primary': primary,
      'button--icon': icon && !text,
    }
  )

  const innerRef = useRef()
  const buttonRef = ref || innerRef

  return (
    <Component className={classes} {...props} ref={buttonRef}>
      <Ripple className="button__ripple" disabled={props.disabled || undefined} />
      {children}
      {icon && <Icon name={icon} />}
      {text && <Text>{text}</Text>}
    </Component>
  )
})

Button.propTypes = {
  primary: PropTypes.bool,
  as: PropTypes.component,
  icon: PropTypes.icon,
  text: PropTypes.string,
  disabled: PropTypes.bool,
}

Button.defaultProps = {
  primary: false,
  disabled: undefined,
}

Button.Text = Text
Button.Icon = Icon
Button.displayName = 'Button'

export default Button
