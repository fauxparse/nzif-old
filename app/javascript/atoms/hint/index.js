import React from 'react'
import classNames from 'classnames'

import './index.scss'

const Hint = ({ className, children, ...props }) => (
  <p className={classNames('hint', className)} {...props}>
    {children}
  </p>
)

export default Hint
