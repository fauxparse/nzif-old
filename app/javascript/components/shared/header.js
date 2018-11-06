import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { NavLink, withRouter } from 'react-router-dom'
import Logo from './logo'
import FullWidth from '../../styles/full_width'
import Invert from '../../styles/invert'

const HeaderContainer = styled(FullWidth)`
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  padding-top: 0;
  padding-bottom: 0;
  height: 2.5em;
  display: flex;
  align-items: stretch;

  @media (min-width: ${props => props.theme.layout.medium}) {
    height: 3.5em;
  }
`

const HeaderLink = styled(NavLink)`
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
    left: 50%;
    bottom: 50%;
    margin: 0 -0.75em -1em;
    width: 1.5em;
    height: 0.25em;
    background: ${props => props.theme.colors.accent};
    transform: scaleX(0);
    transition: transform 0.15s cubic-bezier(0.5, -0.5, 0.5, 1);
  }

  &:hover,
  &:focus,
  &.active {
    outline: none;
    opacity: 1;

    &::after {
      transform: scaleX(1);
      transition: transform 0.15s cubic-bezier(0.5, 2, 0.75, 1);
    }
  }
`

class Header extends React.Component {
  render() {
    const { match } = this.props
    return (
      <Invert>
        <HeaderContainer as="header">
          <Logo />
          <HeaderLink to={`${match.url}/workshops`}>Workshops</HeaderLink>
          <HeaderLink to={`${match.url}/shows`}>Shows</HeaderLink>
        </HeaderContainer>
      </Invert>
    )
  }
}

Header.propTypes = {
  match: PropTypes.shape({ url: PropTypes.string.isRequired }).isRequired,
}

export default withRouter(Header)
