import styled from 'styled-components'

const Label = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.fonts.scale(-1)};
  color: ${({ theme }) => theme.colors.secondary};
`

export default Label
