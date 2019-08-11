import React from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import Skeleton from 'effects/skeleton'

const Tags = ({ className, loading, children, ...props }) => (
  <Skeleton
    as="div"
    className={classNames('card__tags', className)}
    loading={loading}
    {...props}
  >
    {children}
  </Skeleton>
)

Tags.propTypes = {
  loading: PropTypes.bool,
}

Tags.defaultProps = {
  loading: false,
}

export default Tags
