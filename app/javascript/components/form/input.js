import styled from 'styled-components'

const Input = styled.input`
  appearance: none;
  background: transparent;
  border: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: none;
  color: inherit;
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
