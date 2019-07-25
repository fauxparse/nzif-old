import React from 'react'
import classNames from 'classnames'
import PropTypes from 'lib/proptypes'

import './index.scss'

const Label = ({ className, required, children, ...props }) => (
  <label className={classNames('label', required && 'label--required', className)} {...props}>
    {children}
  </label>
)

Label.propTypes = {
  required: PropTypes.bool,
}

Label.defaultProps = {
  required: false,
}

export default Label
