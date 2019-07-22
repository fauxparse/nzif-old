import React from 'react'
import classNames from 'classnames'

const Text = ({ className, children, ...props }) => (
  <span className={classNames('counter__text', className)} data-text={children} {...props}>
    {children}
  </span>
)

export default Text
