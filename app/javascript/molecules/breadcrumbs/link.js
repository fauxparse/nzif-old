import React from 'react'
import classNames from 'classnames'
import { Link as TextLink } from 'react-router-dom'

const Link = ({ className, ...props }) => (
  <TextLink className={classNames('breadcrumbs__link', className)} {...props} />
)

export default Link
