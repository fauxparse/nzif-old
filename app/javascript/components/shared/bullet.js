import styled from 'styled-components'

const Bullet = styled.hr`
  width: 1.5em;
  height: 0.25em;
  display: block;
  background: ${({ theme }) => theme.colors.accent};
  border: 0;
  margin: 1em 0;
`

export default Bullet
