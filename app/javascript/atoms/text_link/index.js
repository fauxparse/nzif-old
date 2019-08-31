import React from 'react'
import PropTypes from 'lib/proptypes'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import './index.scss'

const MailToLink = ({ to = undefined, href = undefined, ...props }) =>
  <a href={to || href} {...props} />

MailToLink.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
}

const TextLink = ({ className, external, rel, children, target, ...props }) => {
  const Component = (props.to || props.href || '').match(/^mailto:/) ? MailToLink : Link

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
  className: PropTypes.className,
  external: PropTypes.bool,
  rel: PropTypes.string,
  target: PropTypes.string,
  to: PropTypes.string,
  href: PropTypes.string,
}

TextLink.defaultProps = {
  className: null,
  external: false,
  rel: null,
  target: null,
  to: null,
  href: null,
}

export default TextLink
