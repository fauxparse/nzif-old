import React from 'react'
import PropTypes from 'lib/proptypes'
import isEmpty from 'lodash/isEmpty'
import Label from 'atoms/label'
import TextField from 'atoms/text_field'
import ErrorMessage from 'atoms/error_message'
import Field from 'molecules/field'

import './index.scss'

const LabelledField = ({
  as: Component,
  id,
  name,
  label,
  required,
  errors,
  children,
  ...props
}) => {
  const errorMessages = (errors || {})[name] || []

  return (
    <Field errors={!isEmpty(errorMessages)}>
      <Label htmlFor={id || name} required={required || undefined}>{label}</Label>
      {Component && (
        <Component
          id={id || name}
          name={name}
          required={required || undefined}
          {...props}
        />
      )}
      {errorMessages.map(message => (
        <ErrorMessage key={message} className="field__error">
          {message}
        </ErrorMessage>
      ))}
      {children}
    </Field>
  )
}

LabelledField.propTypes = {
  as: PropTypes.component,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  errors: PropTypes.object,
}

LabelledField.defaultProps = {
  as: TextField,
  id: undefined,
  required: false,
  errors: {},
}

export default LabelledField
