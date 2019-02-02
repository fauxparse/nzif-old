import React, { forwardRef } from 'react'
import classNames from 'classnames'

const Input = forwardRef(({ as: Element = 'input', className, ...props }, ref) => (
  <Element ref={ref} className={classNames('form__input', className)} {...props} />
))

export default Input
