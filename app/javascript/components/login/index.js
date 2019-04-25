import React, { useEffect, useState } from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import { Switch, Route, withRouter } from 'react-router-dom'
import { withLastLocation } from 'react-router-last-location'
import LogInForm from './log_in_form'
import SignUpForm from './sign_up_form'
import ForgotPasswordForm from './forgot_password_form'
import ResetPasswordForm from './reset_password_form'
import LogInPage from './page'
import PageTransition, { slideLeft } from '../page_transition'

const LogIn = ({ history, lastLocation }) => {
  const [returnTo, setReturnTo] = useState('/')

  useEffect(
    () => {
      if (lastLocation) {
        const pathname = lastLocation.pathname || lastLocation
        if (!/^\/(login|signup|password)/.test(pathname)) {
          setReturnTo(lastLocation)
        }
      }
    },
    [lastLocation]
  )

  const close = () => history.push(returnTo)

  return (
    <LogInPage onClose={close}>
      <Route
        render={({ location }) => {
          const { state: { transition = {} } = {} } = location
          const pageKey = location.key || location.pathname

          return (
            <PageTransition pageKey={pageKey} {...slideLeft} {...transition}>
              <Switch location={location}>
                <Route path="/login" render={() => <LogInForm lastLocation={returnTo} />} />
                <Route path="/signup" render={() => <SignUpForm lastLocation={returnTo} />} />
                <Route
                  path="/password/forgot"
                  render={() => <ForgotPasswordForm lastLocation={returnTo} />}
                />
                <Route
                  path="/password/reset/:token"
                  render={() => <ResetPasswordForm lastLocation={returnTo} />}
                />
              </Switch>
            </PageTransition>
          )
        }}
      />
    </LogInPage>
  )
}

LogIn.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  lastLocation: ReactRouterPropTypes.location
}

LogIn.defaultProps = {
  lastLocation: null
}

export default withLastLocation(withRouter(LogIn))
