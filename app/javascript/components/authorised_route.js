import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { CurrentUserContext } from './shared/current_user'
import CommonProps from '../lib/common_props'

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

AuthorisedRoute.propTypes = {
  component: CommonProps.component.isRequired,
  authorise: PropTypes.func.isRequired,
}

AuthorisedRoute.defaultProps = {
  authorise: () => true,
}

const isAdminUser = ({ user }) => user && new Set(user.roles).has('admin')

export const AdminRoute = (props) =>
  <AuthorisedRoute {...props} authorise={isAdminUser} />

export default AuthorisedRoute
