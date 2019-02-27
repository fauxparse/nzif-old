import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from '../icons'

const Checkbox = ({ checked, className, children, ...props }) => (
  <label className={classNames('checkbox', className)}>
    <input type="checkbox" checked={checked} {...props} />
    <Icon className="checkbox__icon" viewBox="0 0 24 24">
      <path className="circle" d="M12 2a10 10 0 0 1 0 20a10 10 0 0 1 0 -20" />
      <path className="check" d="M17 9l-6 6l-3-3" />
    </Icon>
    <div className="checkbox__label">{children}</div>
  </label>
)

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
}

export default Checkbox
