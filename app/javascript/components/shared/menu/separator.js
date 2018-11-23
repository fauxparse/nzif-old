import styled from 'styled-components'

const Separator = styled.hr`
  border: 1px solid ${({ theme }) => theme.colors.background};
  border-width: 1px 0 0;
  margin: 0.5em 0;
`

export default Separator
