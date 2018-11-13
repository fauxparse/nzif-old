import styled from 'styled-components'
import FullWidth from '../../../styles/full_width'
import MenuButton from './menu_button'
import Logo from './logo'
import HeaderLinks from './links'
import UserMenu from './user_menu'

export default styled(FullWidth)`
  align-items: stretch;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  display: flex;
  height: 3.5em;
  padding-bottom: 0;
  padding-top: 0;
  position: relative;
  z-index: 100;

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
    border-radius: 0;
    margin-left: -1em;
    padding: 1em;
  }

  ${UserMenu} {
    margin-right: -1em;
    order: 1;
  }

  ${HeaderLinks} {
    transform: translate3d(0, 0, 0);
    transition: ${({ theme }) => theme.transition('transform')};
    z-index: -2;

    &[aria-expanded="true"] {
      transform: translate3d(0, 100%, 0);
    }
  }

  @media (min-width: ${({ theme }) => theme.layout.medium}) {
    ${MenuButton} {
      display: none;
    }

    ${Logo} {
      margin-left: -1em;
    }

    ${HeaderLinks} {
      background: none;
      clip-path: none;
      flex-direction: row;
      position: static;
      transform: none;
      transition: none;
      z-index: auto;
    }
  }
`
