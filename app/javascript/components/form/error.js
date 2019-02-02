import React from 'react'
import classNames from 'classnames'

const Error = ({ className, children, ...props }) => (
  <p className={classNames('form__error', className)} {...props}>
    {children}
  </p>
)

export default Error
