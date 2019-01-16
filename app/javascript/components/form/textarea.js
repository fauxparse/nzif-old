import styled, { css } from 'styled-components'
import TextareaAutosize from 'react-textarea-autosize'

const Textarea = styled(TextareaAutosize)`${({ theme }) => css`
  appearance: none;
  background: ${theme.colors.panelBackground};
  border-radius: ${theme.layout.borderRadius};
  border: 0;
  box-shadow: none;
  color: inherit;
  display: block;
  font: inherit;
  line-height: ${theme.fonts.lineHeight};
  margin: 0 0 1em;
  padding: 0.5em 1rem;
  resize: none;
  width: 100%;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 .25em ${theme.colors.outline};
  }

  &:disabled {
    opacity: 0.5;
    background: transparent;
  }
`}`

export default Textarea
