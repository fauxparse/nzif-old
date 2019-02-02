import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

const TextLink = ({ className, children, ...props }) => (
  <Link className={classNames('text-link', className)} {...props}>
    {children}
  </Link>
)

export default TextLink
