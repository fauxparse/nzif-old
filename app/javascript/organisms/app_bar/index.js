import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'lib/proptypes'
import Subcomponent from 'lib/subcomponents'
import Hamburger from 'atoms/hamburger'
import Logo from 'atoms/logo'
import UserMenu from 'molecules/user_menu'
import './index.scss'

const AppBar = ({ user, children }) => {
  return (
    <header className="app-bar" data-theme="dark">
      <Hamburger />
      <Logo as={Link} to="/" />
      <Subcomponent type={AppBar.UserMenu} as={UserMenu} user={user} renderDefault>
        {children}
      </Subcomponent>
    </header>
  )
}

AppBar.propTypes = {
  user: PropTypes.user,
}

AppBar.UserMenu = props => props

export default AppBar
