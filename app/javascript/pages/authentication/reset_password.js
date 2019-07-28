import React, { useCallback, useState } from 'react'
import PropTypes from 'lib/proptypes'
import ReactRouterPropTypes from 'react-router-prop-types'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { withRouter } from 'react-router-dom'
import ResetPasswordForm from 'organisms/reset_password_form'
import {
  CURRENT_USER_QUERY,
  VALIDATE_PASSWORD_RESET_QUERY,
  RESET_PASSWORD_MUTATION,
} from 'queries'

console.log(RESET_PASSWORD_MUTATION)

const ResetPassword = ({ className, match, history, returnTo }) => {
  const { token } = match.params

  const [password, setPassword] = useState('')

  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const { loading: validating, data: { validatePasswordReset: valid = true } = {} } =
    useQuery(VALIDATE_PASSWORD_RESET_QUERY, { variables: { token } })

  const [loading, setLoading] = useState(false)

  const [complete, setComplete] = useState(false)

  const [errors, setErrors] = useState({})

  const resetPassword = useMutation(RESET_PASSWORD_MUTATION, {
    update: (proxy, { data }) => {
      proxy.writeQuery({
        query: CURRENT_USER_QUERY,
        data: { currentUser: data.resetPassword },
      })
    }
  })

  const success = useCallback(() => {
    setLoading(false)
    setComplete(true)
    history.push(returnTo || '/')
  }, [history, returnTo])

  const failure = useCallback(() => {
    setLoading(false)
    setErrors({ passwordConfirmation: ['Passwords don’t match'] })
  }, [setLoading, setErrors])

  const submit = useCallback(() => {
    setLoading(true)
    resetPassword({ variables: { token, password, passwordConfirmation } })
      .then(success)
      .catch(failure)
  }, [token, password, passwordConfirmation, resetPassword, success, failure])

  return (
    <ResetPasswordForm
      className={className}
      loading={loading || validating}
      password={password}
      passwordConfirmation={passwordConfirmation}
      complete={complete}
      errors={{ ...(valid ? {} : { token: ['Token is invalid'] }), ...errors }}
      onPasswordChanged={setPassword}
      onPasswordConfirmationChanged={setPasswordConfirmation}
      onSubmit={submit}
    />
  )
}

ResetPassword.propTypes = {
  returnTo: PropTypes.oneOfType([
    ReactRouterPropTypes.location.isRequired,
    PropTypes.string.isRequired,
  ]),
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
}

export default withRouter(ResetPassword)
