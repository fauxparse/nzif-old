import styled from 'styled-components'
import chroma from 'chroma-js'
import Link from './link'

const Menu = styled.nav`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  min-width: 16em;
  background: ${({ theme }) => chroma(theme.colors.background).alpha(0.9).css()};
  z-index: -2;
  box-shadow: ${({ theme }) => theme.shadow(0)};
  transition: ${({ theme }) => `${theme.transition('transform')}, ${theme.transition('box-shadow')}`}

  &[aria-expanded="true"] {
    box-shadow: ${({ theme }) => theme.shadow(8)};
    transform: translate3d(0, 100%, 0);
  }

  ${Link} {
    opacity: 1;
  }
`

export default Menu
