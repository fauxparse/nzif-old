import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const SkeletonText = ({ loading, className, children, ...props }) => (
  <span
    className={classNames('skeleton-text', className, { 'skeleton-text--loading': loading })}
    aria-busy={loading || undefined}
    aria-hidden={loading || undefined}
    aria-live="polite"
    {...props}
  >
    {children}
  </span>
)

SkeletonText.propTypes = {
  loading: PropTypes.bool.isRequired,
}

SkeletonText.defaultProps = {
  loading: false,
}

export default SkeletonText
