import styled from 'styled-components'
import { fullWidth } from '../../../styles'
import { media } from '../../../styles'
import MenuButton from './menu_button'
import Logo from './logo'
import HeaderLinks from './links'

export default styled.header`
  align-items: stretch;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  height: 3.5em;
  padding-bottom: 0;
  padding-top: 0;
  position: relative;
  z-index: 100;
  box-shadow: ${({ theme }) => theme.shadow(4)};
  -webkit-font-smoothing: antialiased;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background: inherit;
  }

  &::after {
    content: '';
    flex: 1;
  }

  ${MenuButton} {
    order: -1;
    border-radius: 0;
    flex: 0 0 auto;
    padding: 1em;
  }

  ${media.medium`
    ${MenuButton} {
      display: none;
    }

    ${HeaderLinks} {
      background: none;
      clip-path: none;
      flex-direction: row;
      position: static;
      transform: none;
      transition: none;
      z-index: auto;

      &[aria-expanded="true"] {
        box-shadow: ${({ theme }) => theme.shadow(0)};
        transform: translate3d(0, 0, 0);
      }
    }
  `}
`
