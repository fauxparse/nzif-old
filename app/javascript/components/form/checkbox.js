import React from 'react'
import Checkbox from 'atoms/checkbox'

const WrappedCheckbox = ({ className, children, ...props }) => (
  <Checkbox className={className} {...props}>
    <div className="checkbox__label">{children}</div>
  </Checkbox>
)

export default WrappedCheckbox
