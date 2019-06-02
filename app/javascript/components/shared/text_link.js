import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import CommonProps from '../../lib/common_props'

const TextLink = ({ className, external, rel, children, target, ...props }) => (
  <Link
    className={classNames('text-link', className)}
    target={external ? '_blank' : target}
    rel={classNames(rel, external && 'noopener noreferrer') || undefined}
    {...props}
  >
    {children}
  </Link>
)

TextLink.propTypes = {
  className: CommonProps.className,
  external: PropTypes.bool,
  rel: PropTypes.string,
  target: PropTypes.string,
}

TextLink.defaultProps = {
  className: null,
  external: false,
  rel: null,
  target: null,
}

export default TextLink
