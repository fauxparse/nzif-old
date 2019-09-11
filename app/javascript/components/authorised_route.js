import React, { useContext } from 'react'
import PropTypes from 'lib/proptypes'
import { Route, Redirect } from 'react-router-dom'
import { CurrentUserContext, CurrentUserLoadingContext } from 'contexts/current_user'
import Loader from 'atoms/loader'

const AuthorisedRoute = ({ component: Component, authorise, ...props }) => {
  const user = useContext(CurrentUserContext)
  const loading = useContext(CurrentUserLoadingContext)

  return (
    <Route
      {...props}
      render={({ location, match, rest }) => (
        loading
          ? <Loader />
          : (
            authorise({ match, user })
            ? <Component match={match} {...rest} />
            : <Redirect to={{ pathname: '/login', state: { returnTo: location } }} />
          )
      )}
    />
  )
}

AuthorisedRoute.propTypes = {
  component: PropTypes.component.isRequired,
  authorise: PropTypes.func.isRequired,
}

AuthorisedRoute.defaultProps = {
  authorise: () => true,
}

const isAdminUser = ({ user }) => user && new Set(user.roles).has('admin')

export const AdminRoute = (props) =>
  <AuthorisedRoute {...props} authorise={isAdminUser} />

export default AuthorisedRoute
