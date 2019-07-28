import React, { useCallback, useMemo } from 'react'
import PropTypes from 'lib/proptypes'
import ReactRouterPropTypes from 'react-router-prop-types'
import { Route, Switch } from 'react-router-dom'
import Popover from 'organisms/popover'
import PageTransition, { slideLeft } from '../../components/page_transition'
import Login from './login'
import Logout from './logout'
import Signup from './signup'
import ForgotPassword from './forgot_password'
import ResetPassword from './reset_password'

import './index.scss'

const Authentication = ({ history, lastLocation }) => {
  const returnTo = useMemo(() => {
    if (lastLocation) {
      const pathname = lastLocation.pathname || location
      if (!/^\/(login|signup|password)/.test(pathname)) {
        return lastLocation
      }
    }

    return '/'
  }, [lastLocation])

  const close = useCallback(() => history.push(returnTo), [history, returnTo])

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
                      returnTo={returnTo}
                    />
                  )}
                />
                <Route
                  path="/signup"
                  render={() => (
                    <Signup
                      className="authentication__page authentication__signup"
                      returnTo={returnTo}
                    />
                  )}
                />
                <Route
                  path="/password/forgot"
                  render={() => (
                    <ForgotPassword
                      className="authentication__page authentication__forgot-password"
                    />
                  )}
                />
                <Route
                  path="/password/reset/:token"
                  render={() => (
                    <ResetPassword
                      className="authentication__page authentication__reset-password"
                      returnTo={returnTo}
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
  lastLocation: PropTypes.oneOfType([
    ReactRouterPropTypes.location,
    PropTypes.string,
  ]),
}

Authentication.defaultProps = {
  lastLocation: '/',
}

export default Authentication
