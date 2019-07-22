import React, { forwardRef } from 'react'
import classNames from 'classnames'
import PropTypes from 'lib/proptypes'

const Input = forwardRef(({ as: Element = 'input', className, ...props }, ref) => (
  <Element ref={ref} className={classNames('form__input', className)} {...props} />
))

Input.displayName = 'Input'

Input.propTypes = {
  as: PropTypes.component,
}

export default Input
