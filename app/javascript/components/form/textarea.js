import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import TextareaAutosize from 'react-textarea-autosize'

const Textarea = ({ className, value, ...props }) => (
  <TextareaAutosize
    className={classNames('form__textarea', className)}
    value={value || ''}
    {...props}
  />
)

Textarea.propTypes = {
  value: PropTypes.string,
}

export default Textarea
