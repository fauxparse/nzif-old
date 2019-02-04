import React from 'react'
import classNames from 'classnames'

const Label = ({ className, children, ...props }) => (
  <label className={classNames('form__label', className)} {...props}>
    {children}
  </label>
)

export default Label
