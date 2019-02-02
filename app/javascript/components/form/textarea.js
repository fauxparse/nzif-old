import React from 'react'
import classNames from 'classnames'
import TextareaAutosize from 'react-textarea-autosize'

const Textarea = ({ className, ...props }) => (
  <TextareaAutosize className={classNames('form__textarea', className)} {...props} />
)

export default Textarea
