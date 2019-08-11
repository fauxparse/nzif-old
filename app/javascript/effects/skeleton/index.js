import React, { forwardRef } from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'

import './index.scss'

const Skeleton = forwardRef(({ as: Component, loading, className, children, ...props }, ref) => (
  <Component
    ref={ref}
    className={classNames('skeleton', loading && 'skeleton--loading', className)}
    aria-busy={loading || undefined}
    aria-hidden={loading || undefined}
    aria-live="polite"
    {...props}
  >
    {children}
  </Component>
))

Skeleton.displayName = 'Skeleton'

Skeleton.propTypes = {
  as: PropTypes.component,
  loading: PropTypes.bool,
}

Skeleton.defaultProps = {
  as: 'span',
  loading: false,
}

export default Skeleton
