import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from '../../atoms/icon'

const Checkbox = ({ checked, className, children, ...props }) => (
  <label
    className={classNames('checkbox', className, { 'checkbox--checked': checked })}
  >
    <input type="checkbox" checked={checked} {...props} />
    <Icon className="checkbox__icon" viewBox="-16 -16 32 32">
      <circle className="checkbox__focus" cx={0} cy={0} r={13} />
      <path className="checkbox__circle" d="M0 -10a10 10 0 0 1 0 20a10 10 0 0 1 0 -20" />
      <path className="checkbox__check" d="M5 -3l-6 6l-3-3" />
    </Icon>
    <div className="checkbox__label">{children}</div>
  </label>
)

Checkbox.propTypes = {
  checked: PropTypes.bool,
}

export default Checkbox
