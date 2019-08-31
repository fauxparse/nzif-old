import React from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'

import './index.scss'

const Switch = ({ className, checked, ...props }) => {
  return (
    <label className={classNames('toggle-switch', className)}>
      <input type="checkbox" checked={checked} {...props} />
      <span className="toggle-switch__track">
        <span className="toggle-switch__thumb" />
      </span>
    </label>
  )
}

Switch.propTypes = {
  checked: PropTypes.bool,
}

Switch.defaultProps = {
  checked: undefined,
}

export default Switch
