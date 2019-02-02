import React from 'react'
import classNames from 'classnames'

const Label = ({ className, children, ...props }) => (
  <Label className={classNames('form__label', className)} {...props}>
    {children}
  </Label>
)

export default Label
