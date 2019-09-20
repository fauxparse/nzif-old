import React from 'react'
import PropTypes from 'lib/proptypes'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import './index.scss'

const AnchorLink = ({ to = undefined, href = undefined, ...props }) =>
  <a href={to || href} {...props} />

AnchorLink.propTypes = {
  to: PropTypes.location,
  href: PropTypes.location,
}

const TextLink = ({ className, external, rel, children, target, ...props }) => {
  const Component = props.as ||
    ((props.to || props.href || '').toString().match(/^(mailto|https?):/) ? AnchorLink : Link)

  return (
    <Component
      className={classNames('text-link', className)}
      target={external ? '_blank' : target}
      rel={classNames(rel, external && 'noopener noreferrer') || undefined}
      {...props}
    >
      {children}
    </Component>
  )
}

TextLink.propTypes = {
  as: PropTypes.component,
  className: PropTypes.className,
  external: PropTypes.bool,
  rel: PropTypes.string,
  target: PropTypes.string,
  to: PropTypes.location,
  href: PropTypes.location,
}

TextLink.defaultProps = {
  as: null,
  className: null,
  external: false,
  rel: null,
  target: null,
  to: null,
  href: null,
}

export default TextLink
