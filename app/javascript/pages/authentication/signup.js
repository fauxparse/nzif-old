import React, { useCallback, useState } from 'react'
import PropTypes from 'lib/proptypes'
import ReactRouterPropTypes from 'react-router-prop-types'
import { withRouter } from 'react-router-dom'
import { withApollo } from 'react-apollo'
import { useMutation } from 'react-apollo-hooks'
import compose from 'lib/compose'
import { SIGN_UP_MUTATION, CURRENT_USER_QUERY } from 'queries'
import LoginForm from 'organisms/login_form'

const Signup = ({ className, client, history, returnTo }) => {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [errors, setErrors] = useState({})

  const signUp = useMutation(SIGN_UP_MUTATION, {
    update: (proxy, { data }) => {
      proxy.writeQuery({
        query: CURRENT_USER_QUERY,
        data: { currentUser: data.logIn },
      })
    }
  })

  const submit = useCallback((variables) => {
    setLoading(true)

    signUp({ variables })
      .then(() => client.resetStore())
      .then(() => history.push(returnTo || '/'))
      .catch((e) => {
        setLoading(false)
        setErrors(e.graphQLErrors[0].detail)
      })
  }, [signUp, client, returnTo, history, setLoading, setErrors])

  return (
    <LoginForm
      mode="signup"
      className={className}
      returnTo={returnTo}
      loading={loading}
      name={name}
      email={email}
      password={password}
      passwordConfirmation={passwordConfirmation}
      errors={errors}
      onNameChanged={setName}
      onEmailChanged={setEmail}
      onPasswordChanged={setPassword}
      onPasswordConfirmationChanged={setPasswordConfirmation}
      onSubmit={submit}
    />
  )
}

Signup.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  returnTo: PropTypes.oneOfType([
    ReactRouterPropTypes.location,
    PropTypes.string,
  ]),
}

Signup.defaultProps = {
  returnTo: '/',
}

export default compose(withApollo, withRouter)(Signup)
