import React from 'react'
import classNames from 'classnames'
import CommonProps from '../../lib/common_props'
import Icon from '../../atoms/icon'

const Detail = ({ icon, className, children }) => (
  <div className="detail">
    <Icon className="detail__icon" name={icon} />
    <div className={classNames('detail__content', className)}>
      {children}
    </div>
  </div>
)

Detail.propTypes = {
  icon: CommonProps.icon.isRequired,
  className: CommonProps.className,
}

export default Detail
