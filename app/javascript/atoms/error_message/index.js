import React from 'react'
import classNames from 'classnames'

import './index.scss'

const ErrorMessage = ({ className, children, ...props }) => (
  <p className={classNames('error-message', className)} {...props}>
    {children}
  </p>
)

export default ErrorMessage
