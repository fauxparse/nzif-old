import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { NavLink, withRouter } from 'react-router-dom'
import Logo from './logo'
import FullWidth from '../../styles/full_width'
import Invert from '../../styles/invert'
import UserMenu from './user_menu'
import RippledLink from './rippled_link'
import MenuButton from './menu_button'

const HeaderLink = styled(RippledLink)`
  align-items: center;
  color: ${props => props.theme.colors.text};
  display: flex;
  opacity: 0.75;
  padding: 0 0.5em;
  position: relative;
  text-decoration: none;
  transition: ${props => props.theme.transition('color')};

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 0.25em;
    background: ${props => props.theme.colors.accent};
    transform: scaleY(0);
    transition: transform 0.15s cubic-bezier(0.5, -0.5, 0.5, 1);
  }

  &:hover,
  &:focus,
  &.active {
    outline: none;
    opacity: 1;

    &::after {
      transform: scaleY(1);
      transition: transform 0.15s cubic-bezier(0.5, 2, 0.75, 1);
    }
  }

  @media (min-width: ${({ theme }) => theme.layout.medium}) {
    &::after {
      left: 50%;
      top: auto;
      bottom: 50%;
      margin: 0 -0.75em -1em;
      width: 1.5em;
      height: 0.25em;
      transform: scaleX(0);
    }

    &:hover,
    &:focus,
    &.active {
      &::after {
        transform: scaleX(1);
      }
    }
  }
`

const HeaderLinks = styled.div`
  background: ${({theme}) => theme.colors.palette.grey[600]};
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: -1;
  transform: translate3d(0, ${({ push }) => `${push}px`}, 0);
  transition: ${({ theme }) => theme.transition('transform')};

  ${HeaderLink} {
    padding: 1em;
  }
`

const HeaderContainer = styled(FullWidth)`
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
    transform: translate(0, -100%);
    transition: ${({ theme }) => theme.transition('transform')};
    z-index: -2;

    &[aria-expanded="true"] {
      transform: translate(0, 0);
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

class Header extends React.Component {
  state = { menuOpen: false }

  toggleMenu = (e) => {
    e.stopPropagation()
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  render() {
    const { match } = this.props
    const { menuOpen } = this.state
    const push = (menuOpen && this.headerLinks && this.headerLinks.clientHeight) || 0

    return (
      <Invert>
        <HeaderContainer as="header" push={push}>
          <MenuButton open={menuOpen} onClick={this.toggleMenu} />
          <Logo />
          <HeaderLinks aria-expanded={menuOpen} ref={el => this.headerLinks = el}>
            <HeaderLink to={`${match.url}/workshops`}>Workshops</HeaderLink>
            <HeaderLink to={`${match.url}/shows`}>Shows</HeaderLink>
          </HeaderLinks>
          <UserMenu />
        </HeaderContainer>
      </Invert>
    )
  }
}

Header.propTypes = {
  match: PropTypes.shape({ url: PropTypes.string.isRequired }).isRequired,
}

export default withRouter(Header)
