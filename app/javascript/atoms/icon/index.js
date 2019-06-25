import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import CommonProps from '../../lib/common_props'
import ICONS from './all'
import './index.scss'

class Icon extends React.PureComponent {
  render() {
    const {
      children,
      name,
      className,
      viewBox = '0 0 24 24',
      ...props
    } = this.props

    if (children || name) {
      return (
        <svg
          className={classNames('icon', className)}
          data-icon={name}
          viewBox={viewBox}
          {...props}
        >
          {children || <use xlinkHref={`#icon-${name}`} />}
        </svg>
      )
    } else {
      return null
    }
  }
}

Icon.propTypes = {
  className: PropTypes.string,
  name: CommonProps.icon,
  viewBox: PropTypes.string,
}

export { ICONS }

export default Icon
