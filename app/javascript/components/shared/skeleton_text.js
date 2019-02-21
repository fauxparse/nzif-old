import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const SkeletonText = ({ as: Component, loading, className, children, ...props }) => (
  <Component
    className={classNames('skeleton--text', className, { 'skeleton--loading': loading })}
    aria-busy={loading || undefined}
    aria-hidden={loading || undefined}
    aria-live="polite"
    {...props}
  >
    {children}
  </Component>
)

SkeletonText.propTypes = {
  loading: PropTypes.bool.isRequired,
  as: PropTypes.any,
}

SkeletonText.defaultProps = {
  loading: false,
  as: 'span',
}

export default SkeletonText
