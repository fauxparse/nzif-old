import React from 'react'
import styled, { css } from 'styled-components'
import Textarea from 'react-textarea-autosize'
import { Input } from '../../form'

const NameInput = styled(Input)`${({ theme }) => css`
  font-size: ${theme.fonts.size(7)};
  line-height: ${theme.fonts.lineHeights.tight};
  padding: 0.25em 0;
  margin: 0 0 1.5rem;
  font-weight: ${theme.fonts.weights.light};
  resize: none;
`}`

const Name = ({ value, onChange, ...props }) =>
  <NameInput as={Textarea} value={value} onChange={onChange} {...props} />

export default Name
