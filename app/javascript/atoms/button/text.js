import React from 'react'
import classNames from 'classnames'

const Text = ({ className, children, ...props }) => (
  <span className={classNames('button__text', className)} {...props}>
    {children}
  </span>
)

export default Text
