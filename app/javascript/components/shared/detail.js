import React from 'react'
import classNames from 'classnames'
import PropTypes from 'lib/proptypes'
import Icon from 'atoms/icon'

const Detail = ({ icon, className, children }) => (
  <div className="detail">
    <Icon className="detail__icon" name={icon} />
    <div className={classNames('detail__content', className)}>
      {children}
    </div>
  </div>
)

Detail.propTypes = {
  icon: PropTypes.icon.isRequired,
  className: PropTypes.className,
}

export default Detail
