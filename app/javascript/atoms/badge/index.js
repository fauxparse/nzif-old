import React from 'react'
import classNames from 'classnames'

import './index.scss'

const Badge = ({ className, children, ...props }) => (
  <span className={classNames('badge', className)} {...props}>
    {children}
  </span>
)

export default Badge
