import styled from 'styled-components'
import HeaderLink from './link'

export default styled.nav`
  background: ${({theme}) => theme.colors.palette.grey[600]};
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;

  ${HeaderLink} {
    padding: 1em;
  }
`
