import React from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import './index.scss'

const Divider = ({ as: Component, className, inset, middle, accent, ...props }) => (
  <Component
    className={classNames(
      'divider',
      inset && 'divider--inset',
      middle && 'divider--middle',
      accent && 'divider--accent',
      className
    )}
    {...props}
  />
)

Divider.propTypes = {
  as: PropTypes.component,
  className: PropTypes.className,
  inset: PropTypes.bool,
  middle: PropTypes.bool,
  accent: PropTypes.bool,
}

Divider.defaultProps = {
  as: 'hr',
  inset: false,
  middle: false,
  accent: false,
}

export default Divider
