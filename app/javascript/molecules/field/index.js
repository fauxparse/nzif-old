import React from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import Icon from 'atoms/icon'

import './index.scss'

const Field = ({ className, required, errors, icon, children, ...props }) => {
  return (
    <div
      className={classNames(
        'field',
        required && 'field--required',
        errors && 'field--error',
        icon && 'field--icon',
        className,
      )}
      {...props}
    >
      {icon && <Icon name={icon} className="field__icon" />}
      {children}
    </div>
  )
}

Field.propTypes = {
  required: PropTypes.bool,
  errors: PropTypes.bool,
  icon: PropTypes.icon,
}

Field.defaultProps = {
  required: false,
  errors: false,
  icon: undefined,
}

export default Field
