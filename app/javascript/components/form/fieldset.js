import React from 'react'
import classNames from 'classnames'

const Fieldset = ({ className, children, ...props }) => (
  <fieldset className={classNames('form__fieldset', className)} {...props}>
    {children}
  </fieldset>
)

export default Fieldset
