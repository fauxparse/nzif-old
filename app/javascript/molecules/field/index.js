import React from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'

import './index.scss'

const Field = ({ className, required, errors, children, ...props }) => {
  return (
    <div
      className={classNames(
        'field',
        required && 'field--required',
        errors && 'field--error',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

Field.propTypes = {
  required: PropTypes.bool,
  errors: PropTypes.bool,
}

Field.defaultProps = {
  required: false,
  errors: false,
}

export default Field
