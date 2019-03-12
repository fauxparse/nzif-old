import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import CommonProps from '../../lib/common_props'
import Ripple from '../shared/ripple'
import Text from './text'
import Icon from './icon'

const Button = forwardRef(({
  className,
  as = 'button',
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

  return (
    <Ripple className={classes} {...props} as={as} ref={ref}>
      {children}
      {icon && <Icon name={icon} />}
      {text && <Text>{text}</Text>}
    </Ripple>
  )
})

Button.propTypes = {
  primary: PropTypes.bool,
  as: CommonProps.component,
  icon: CommonProps.icon,
  text: PropTypes.string,
}

Button.defaultProps = {
  primary: false,
}

Button.Text = Text
Button.Icon = Icon

export default Button
