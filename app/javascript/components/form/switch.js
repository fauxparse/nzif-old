import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from '../../atoms/icon'

const Switch = ({ checked, className, children, ...props }) => (
  <label className={classNames('switch', className)}>
    <input type="checkbox" checked={checked} {...props} />
    <Icon className="switch__icon" viewBox="0 0 36 24">
      <path className="track" d="M12 2h12a10 10 0 0 1 0 20h-12a10 10 0 0 1 0 -20" />
      <path className="thumb" d="M12 2a10 10 0 0 1 0 20a10 10 0 0 1 0 -20" />
    </Icon>
    <div className="switch__label">{children}</div>
  </label>
)

Switch.propTypes = {
  checked: PropTypes.bool,
}

export default Switch
