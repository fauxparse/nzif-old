import React from 'react'
import classNames from 'classnames'
import PropTypes from '../../lib/proptypes'
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
  name: PropTypes.icon,
  viewBox: PropTypes.string,
}

export { ICONS }

export default Icon
