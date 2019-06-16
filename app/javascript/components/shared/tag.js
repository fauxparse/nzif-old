import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import CommonProps from '../../lib/common_props'

const Tag = ({ className, selected, children, ...props }) => (
  <span className={classNames('tag', selected && 'tag--selected', className)} {...props}>
    <span className="tag__text">{children}</span>
  </span>
)

Tag.propTypes = {
  className: CommonProps.className,
  selected: PropTypes.bool,
}

Tag.defaultProps = {
  selected: false,
}

export default Tag
