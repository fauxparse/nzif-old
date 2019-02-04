import React from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import { withRouter } from 'react-router-dom'
import Flatten from '../../flatten'
import Menu from '../menu'
import CurrentUser from '../current_user'
import Logo from './logo'
import MenuButton from './menu_button'
import Link from './link'
import Links from './links'

export { Link }

class Header extends React.Component {
  render() {
    const { match, children } = this.props

    return (
      <header className="header">
        <Logo root={match.url} year={match.params.year} />
        <Menu
          component={Flatten}
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
      </header>
    )
  }
}

Header.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  location: ReactRouterPropTypes.location.isRequired
}

export default withRouter(Header)
