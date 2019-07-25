import React from 'react'
import PropTypes from 'prop-types'
import { Label, Field } from '../../form'
import Markdown from 'molecules/markdown'

const Answer = ({ label, text, children }) => (
  <Field className="pitch__field">
    <Label>{label}</Label>
    {children || <Markdown text={text || '(blank)'} />}
  </Field>
)

Answer.propTypes = {
  label: PropTypes.string.isRequired,
  text: PropTypes.string,
}

Answer.defaultProps = {
  text: '',
}

export default Answer
