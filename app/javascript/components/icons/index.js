import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ICONS from './all'

class Icon extends React.PureComponent {
  render() {
    const { children, name, className, viewBox = '0 0 24 24', ...props } = this.props

    if (children || name) {
      return (
        <svg className={classNames('icon', className)} viewBox={viewBox} {...props}>
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
  name: PropTypes.oneOf(ICONS),
}

export { ICONS }

export default Icon
