import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { NavLink, withRouter } from 'react-router-dom'
import Logo from './logo'
import HeaderTheme from './theme'
import UserMenu from './user_menu'
import MenuButton from './menu_button'
import HeaderLink from './link'
import HeaderLinks from './links'
import HeaderContainer from './container'

class Header extends React.Component {
  state = { menuOpen: false }

  toggleMenu = (e) => {
    e.stopPropagation()
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  componentDidUpdate(prevProps) {
    if (this.state.menuOpen && (prevProps.location !== this.props.location)) {
      this.setState({ menuOpen: false });
    }
  }

  render() {
    const { match } = this.props
    const { menuOpen } = this.state
    const push = (menuOpen && this.headerLinks && this.headerLinks.clientHeight) || 0

    return (
      <HeaderTheme>
        <HeaderContainer as="header" push={push}>
          <MenuButton open={menuOpen} onClick={this.toggleMenu} />
          <Logo />
          <HeaderLinks aria-expanded={menuOpen} ref={el => this.headerLinks = el}>
            <HeaderLink to={`${match.url}/workshops`}>Workshops</HeaderLink>
            <HeaderLink to={`${match.url}/shows`}>Shows</HeaderLink>
          </HeaderLinks>
          <UserMenu />
        </HeaderContainer>
      </HeaderTheme>
    )
  }
}

Header.propTypes = {
  match: PropTypes.shape({ url: PropTypes.string.isRequired }).isRequired,
  location: PropTypes.object.isRequired,
}

export default withRouter(Header)
