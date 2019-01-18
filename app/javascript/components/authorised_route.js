import React from 'react'
import { Route } from 'react-router-dom'
import { CurrentUserContext } from './shared/current_user'

const AuthorisedRoute = ({ component: Component, authorise, ...props }) => (
  <CurrentUserContext.Consumer>
    {user => (
      <Route {...props} render={({ match, rest }) => (
        authorise({ match, user })
          ? <Component match={match} {...rest} />
          : null
      )} />
    )}
  </CurrentUserContext.Consumer>
)

AuthorisedRoute.defaultProps = {
  authorise: () => true
}

const isAdminUser = ({ user }) => user && new Set(user.roles).has('admin')

export const AdminRoute = (props) =>
  <AuthorisedRoute {...props} authorise={isAdminUser} />

export default AuthorisedRoute
