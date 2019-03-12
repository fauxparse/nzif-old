import React, { forwardRef } from 'react'
import classNames from 'classnames'
import CommonProps from '../../lib/common_props'

const Input = forwardRef(({ as: Element = 'input', className, ...props }, ref) => (
  <Element ref={ref} className={classNames('form__input', className)} {...props} />
))

Input.displayName = 'Input'

Input.propTypes = {
  as: CommonProps.component,
}

export default Input
