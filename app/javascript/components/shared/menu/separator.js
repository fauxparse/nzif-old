import React from 'react'
import classNames from 'classnames'

const Separator = ({ className, ...props }) => (
  <hr className={classNames('menu__separator', className)} {...props} />
)

export default Separator
