import React from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'

const Tag = ({ className, selected, children, ...props }) => (
  <span className={classNames('tag', selected && 'tag--selected', className)} {...props}>
    <span className="tag__text">{children}</span>
  </span>
)

Tag.propTypes = {
  className: PropTypes.className,
  selected: PropTypes.bool,
}

Tag.defaultProps = {
  selected: false,
}

export default Tag
