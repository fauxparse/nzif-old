import React, { createRef } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import Logo from './logo'
import HeaderTheme from './theme'
import CurrentUser from './current_user'
import MenuButton from './menu_button'
import Link from './link'
import Links from './links'
import HeaderContainer from './container'

class Header extends React.Component {
  state = { menuOpen: false }

  menuRef = createRef()
  buttonRef = createRef()

  componentDidMount() {
    document.addEventListener('mousedown', this.closeMenu)
    document.addEventListener('touchstart', this.closeMenu)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.closeMenu)
    document.removeEventListener('touchstart', this.closeMenu)
  }

  closeMenu = e => {
    const menu = this.menuRef.current
    const button = this.buttonRef.current

    if (this.state.menuOpen && ![menu, button].find(el => el && el.contains(e.target))) {
      this.toggleMenu()
    }
  }

  toggleMenu = () => {
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

    return (
      <HeaderTheme>
        <HeaderContainer as="header">
          <MenuButton ref={this.buttonRef} open={menuOpen} onClick={this.toggleMenu} />
          <Logo year={match.params.year} />
          <Links ref={this.menuRef} aria-expanded={menuOpen}>
            <Link to={`${match.url}/workshops`}>
              <Link.Icon name="workshop" />
              <Link.Text>Workshops</Link.Text>
            </Link>
            <Link to={`${match.url}/shows`}>
              <Link.Icon name="show" />
              <Link.Text>Shows</Link.Text>
            </Link>
          </Links>
          <CurrentUser />
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
