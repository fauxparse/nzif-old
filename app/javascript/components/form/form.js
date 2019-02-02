import React from 'react'
import classNames from 'classnames'

const Form = ({ className, children, ...props }) => (
  <form className={classNames('form', className)} {...props}>
    {children}
  </form>
)

export default Form
