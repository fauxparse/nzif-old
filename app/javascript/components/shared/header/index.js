import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import Menu from '../menu'
import CurrentUser from '../current_user'
import Logo from './logo'
import Theme from './theme'
import MenuButton from './menu_button'
import Link from './link'
import Links from './links'
import HeaderContainer from './container'

export { Link }

class Header extends React.Component {
  render() {
    const { match, children } = this.props

    return (
      <Theme>
        <HeaderContainer>
          <Logo root={match.url} year={match.params.year} />
          <Menu
            component={Fragment}
            renderButton={({ ref, open, toggle }) => (
              <MenuButton ref={ref} open={open} onClick={toggle} />
            )}
            renderContent={({ ref, open }) => (
              <Links ref={ref} aria-expanded={open}>
                {children}
              </Links>
            )}
          />
          <CurrentUser />
        </HeaderContainer>
      </Theme>
    )
  }
}

Header.propTypes = {
  match: PropTypes.shape({ url: PropTypes.string.isRequired }).isRequired,
  location: PropTypes.object.isRequired
}

export default withRouter(Header)
