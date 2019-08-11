import React from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import Skeleton from 'effects/skeleton'

const Description = ({ className, loading, children, ...props }) => (
  <Skeleton
    as="div"
    className={classNames('card__description', className)}
    loading={loading}
    {...props}
  >
    {children}
  </Skeleton>
)

Description.propTypes = {
  loading: PropTypes.bool,
}

Description.defaultProps = {
  loading: false,
}

export default Description
