import React from 'react'
import classNames from 'classnames'
import Icon from 'atoms/icon'

const ButtonIcon = ({ className, children, ...props }) => (
  <Icon className={classNames('button__icon', className)} {...props} />
)

export default ButtonIcon
