import React from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import Skeleton from 'effects/skeleton'

const Title = ({ className, loading, children, ...props }) => (
  <Skeleton
    as="h4"
    className={classNames('card__title', className)}
    loading={loading}
    {...props}
  >
    {children}
  </Skeleton>
)

Title.propTypes = {
  loading: PropTypes.bool,
}

Title.defaultProps = {
  loading: false,
}

export default Title
