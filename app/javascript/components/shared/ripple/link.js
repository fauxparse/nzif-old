import React from 'react'
import classNames from 'classnames'
import Ripple from './container'
import Link from '../link'

const RippledLink = ({ className, children, ...props }) => (
  <Ripple as={Link} className={classNames('ripple--link', className)} {...props}>
    {children}
  </Ripple>
)

export default RippledLink
