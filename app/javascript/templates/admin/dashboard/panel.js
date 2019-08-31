import React from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import Loader from 'atoms/loader'

const Panel = ({ title, loading, className, children, ...props }) => (
  <article className={classNames('panel', 'dashboard__panel', className)} {...props}>
    <h4 className="panel__title">{title}</h4>
    {loading ? <Loader /> : children}
  </article>
)

Panel.propTypes = {
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool,
}

Panel.defaultProps = {
  loading: false,
}

export default Panel
