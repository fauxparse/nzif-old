import React, { useCallback, useMemo } from 'react'
import PropTypes from 'lib/proptypes'
import ReactRouterPropTypes from 'react-router-prop-types'
import { Route, Switch } from 'react-router-dom'
import { withLastLocation } from 'react-router-last-location'
import Popover from 'organisms/popover'
import PageTransition, { slideLeft } from '../../components/page_transition'
import Login from './login'
import Logout from './logout'
import Signup from './signup'
import ForgotPassword from './forgot_password'
import ResetPassword from './reset_password'

import './index.scss'

const Authentication = ({ history, location, lastLocation }) => {
  const { returnTo } = location.state || {}

  const nextLocation = useMemo(() => (
    [returnTo, lastLocation, '/'].find(location => {
      const pathname = (location && location.pathname) || location
      return pathname && !/^\/(login|signup|password)/.test(pathname)
    })
  ), [returnTo, lastLocation])

  const close = useCallback(() => history.push(nextLocation), [history, nextLocation])

  return (
    <Popover
      className="authentication"
      wrapper={null}
      onClose={close}
    >
      <Route
        render={({ location }) => {
          const pageKey = location.key || location.pathname
          const { transition } = location.state || {}

          return (
            <PageTransition pageKey={pageKey} {...slideLeft} {...transition}>
              <Switch location={location}>
                <Route
                  path="/login"
                  render={() => (
                    <Login
                      className="authentication__page authentication__login"
                      returnTo={nextLocation}
                    />
                  )}
                />
                <Route
                  path="/signup"
                  render={() => (
                    <Signup
                      className="authentication__page authentication__signup"
                      returnTo={nextLocation}
                    />
                  )}
                />
                <Route
                  path="/password/forgot"
                  render={() => (
                    <ForgotPassword
                      className="authentication__page authentication__forgot-password"
                      returnTo={nextLocation}
                    />
                  )}
                />
                <Route
                  path="/password/reset/:token"
                  render={() => (
                    <ResetPassword
                      className="authentication__page authentication__reset-password"
                      returnTo={nextLocation}
                    />
                  )}
                />
                <Route path="/logout" component={Logout} />
              </Switch>
            </PageTransition>
          )
        }}
      />
    </Popover>
  )
}

Authentication.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  lastLocation: PropTypes.location,
}

Authentication.defaultProps = {
  lastLocation: undefined,
}

export default withLastLocation(Authentication)
