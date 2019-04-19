import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const SkeletonText = forwardRef(({
  as: Component,
  loading,
  className,
  children,
  ...props
}, ref) => (
  <Component
    ref={ref}
    className={classNames('skeleton--text', className, { 'skeleton--loading': loading })}
    aria-busy={loading || undefined}
    aria-hidden={loading || undefined}
    aria-live="polite"
    {...props}
  >
    {children}
  </Component>
))

SkeletonText.displayName = 'Skeleton'

SkeletonText.propTypes = {
  loading: PropTypes.bool.isRequired,
  as: PropTypes.any,
}

SkeletonText.defaultProps = {
  loading: false,
  as: 'span',
}

export default SkeletonText
