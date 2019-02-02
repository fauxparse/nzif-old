import React from 'react'
import classNames from 'classnames'

const Field = ({ className, children, ...props }) => (
  <div className={classNames('form__field', className)} {...props}>
    {children}
  </div>
)

export default Field
