import React from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import './index.scss'

const Tag = ({ className, selected, small, children, ...props }) => (
  <span
    className={classNames(
      'tag',
      selected && 'tag--selected',
      small && 'tag--small',
      className
    )}
    {...props}
  >
    <span className="tag__text">{children}</span>
  </span>
)

Tag.propTypes = {
  className: PropTypes.className,
  selected: PropTypes.bool,
  small: PropTypes.bool,
}

Tag.defaultProps = {
  selected: false,
  small: false,
}

export default Tag
