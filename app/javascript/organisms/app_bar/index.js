import React, { useCallback } from 'react'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'lib/proptypes'
import Hamburger from 'atoms/hamburger'
import Logo from 'atoms/logo'
import UserMenu from 'molecules/user_menu'
import './index.scss'

const AppBar = ({ history, user }) => {
  const logIn = useCallback(() => history.push('/login'), [history])

  return (
    <header className="app-bar" data-theme="dark">
      <Hamburger />
      <Logo as={Link} to="/" />
      <UserMenu user={user} onLoginClick={logIn} />
    </header>
  )
}

AppBar.propTypes = {
  user: PropTypes.user,
}

export default withRouter(AppBar)
