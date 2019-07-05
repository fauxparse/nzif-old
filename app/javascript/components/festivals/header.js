import React, { useContext, useMemo } from 'react'
import PropTypes from 'lib/proptypes'
import AppBar from 'organisms/app_bar'
import Menu from 'molecules/menu'
import { useCurrentUser } from 'lib/hooks'
import Divider from 'atoms/divider'
import Context from './context'

const FestivalHeader = ({ onLogin }) => {
  const user = useCurrentUser()

  const isAdmin = useMemo(() => user && user.roles.includes('admin'), [user])

  const festival = useContext(Context)

  const { year } = festival || {}

  return (
    <AppBar user={user}>
      <AppBar.UserMenu onLoginClick={onLogin}>
        {isAdmin && (
          <Menu.Link to={`/admin${year ? `/${year}` : ''}`} icon="admin" primary="Festival admin" />
        )}
        <Divider />
        <Menu.Link to="/logout" icon="log-out" primary="Log out" />
      </AppBar.UserMenu>
    </AppBar>
  )
}

FestivalHeader.propTypes = {
  onLogin: PropTypes.func.isRequired,
}

export default FestivalHeader
