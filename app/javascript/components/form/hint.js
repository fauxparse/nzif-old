import React from 'react'
import classNames from 'classnames'

const Hint = ({ className, children }) => (
  <div className={classNames('form__hint', className)}>
    {children}
  </div>
)

export default Hint
