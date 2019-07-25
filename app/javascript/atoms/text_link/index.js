import React from 'react'
import PropTypes from 'lib/proptypes'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import './index.scss'

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
  className: PropTypes.className,
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
