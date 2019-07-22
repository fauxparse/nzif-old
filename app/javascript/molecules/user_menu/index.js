import React from 'react'
import PropTypes from 'lib/proptypes'
import Button from 'atoms/button'
import Menu from 'molecules/menu'
import CurrentUser from './current_user'
import './index.scss'

const UserMenu = ({ user, onLoginClick, children }) => (
  <div className="user-menu">
    {user ? (
      <Menu className="user-menu" button={CurrentUser} user={user}>
        {children}
      </Menu>
    ) : (
      <Button
        className="user-menu__log-in"
        primary
        icon="user"
        text="Log in"
        onClick={onLoginClick}
      />
    )}
  </div>
)

UserMenu.propTypes = {
  user: PropTypes.user,
  onLoginClick: PropTypes.func.isRequired,
}

UserMenu.defaultProps = {
  user: undefined,
}

export default UserMenu
