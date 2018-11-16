import styled from 'styled-components'
import chroma from 'chroma-js'

const Input = styled.input`
  appearance: none;
  background: transparent;
  border: 0;
  border-bottom: 1px solid ${({ theme }) => chroma(theme.colors.text).alpha(0.25).css()};
  box-shadow: none;
  color: ${({ theme }) => theme.colors.text};
  display: block;
  font: inherit;
  line-height: 1.5em;
  margin: 0 0 1em;
  padding: 0.5em 0 calc(0.5em - 1px);
  width: 100%;

  &:focus {
    outline: none;
    border-bottom-color: ${({ theme }) => theme.colors.accent};
  }

  &:disabled {
    opacity: 0.5;
  }
`

export default Input
