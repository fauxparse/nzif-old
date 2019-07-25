import React, { useContext, useMemo } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'lib/proptypes'
import AppBar from 'organisms/app_bar'
import Menu from 'molecules/menu'
import { useCurrentUser } from 'lib/hooks'
import Divider from 'atoms/divider'
import Context from 'contexts/festival'

const FestivalHeader = ({ match, onLogin, ...props }) => {
  const user = useCurrentUser()

  const isAdmin = useMemo(() => user && user.roles.includes('admin'), [user])

  const festival = useContext(Context)

  const { year } = festival || {}

  return (
    <AppBar user={user} {...props}>
      <AppBar.UserMenu onLoginClick={onLogin}>
        {isAdmin && (
          <Menu.Link to={`/admin${year ? `/${year}` : ''}`} icon="admin" primary="Festival admin" />
        )}
        <Menu.Link to={`${match.url}/profile`} icon="user" primary="Profile" />
        <Divider />
        <Menu.Link to="/logout" icon="log-out" primary="Log out" />
      </AppBar.UserMenu>
    </AppBar>
  )
}

FestivalHeader.propTypes = {
  onLogin: PropTypes.func.isRequired,
}

export default withRouter(FestivalHeader)
