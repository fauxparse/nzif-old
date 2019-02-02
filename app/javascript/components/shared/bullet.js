import React from 'react'
import classNames from 'classnames'

const Bullet = ({ className, ...props }) =>
  <hr className={classNames('bullet', className)} {...props} />

export default Bullet
