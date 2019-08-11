import React from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import Skeleton from 'effects/skeleton'

const Category = ({ className, loading, children, ...props }) => (
  <Skeleton
    as="div"
    className={classNames('card__category', className)}
    loading={loading}
    {...props}
  >
    {children}
  </Skeleton>
)

Category.propTypes = {
  loading: PropTypes.bool,
}

Category.defaultProps = {
  loading: false,
}

export default Category
