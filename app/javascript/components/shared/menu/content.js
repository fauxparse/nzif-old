import styled from 'styled-components'
import chroma from 'chroma-js'
import { transition } from '../../../styles'

const Content = styled.nav`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  min-width: 16em;
  padding: 0.5em 0;
  background: ${({ theme }) => chroma(theme.colors.background).alpha(0.875).css('hsl')};
  z-index: -2;
  box-shadow: ${({ theme }) => theme.shadow(0)};
  transition: ${transition('transform', 'box-shadow')};

  &[aria-expanded="true"] {
    box-shadow: ${({ theme }) => theme.shadow(8)};
    transform: translate3d(0, 100%, 0);
  }
`

export default Content
