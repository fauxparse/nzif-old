import React, { useCallback, useState } from 'react'
import PropTypes from 'lib/proptypes'
import ReactRouterPropTypes from 'react-router-prop-types'
import { withRouter } from 'react-router-dom'
import { withApollo } from 'react-apollo'
import { useMutation } from 'react-apollo-hooks'
import compose from 'lib/compose'
import { LOG_IN_MUTATION, CURRENT_USER_QUERY } from 'queries'
import LoginForm from 'organisms/login_form'

const Login = ({ className, client, history, returnTo }) => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  const logIn = useMutation(LOG_IN_MUTATION, {
    update: (proxy, { data }) => {
      proxy.writeQuery({
        query: CURRENT_USER_QUERY,
        data: { currentUser: data.logIn },
      })
    }
  })

  const submit = useCallback((variables) => {
    setLoading(true)

    logIn({ variables })
      .then(() => client.resetStore())
      .then(() => history.push(returnTo || '/'))
      .catch((e) => {
        setLoading(false)
        setErrors({ email: [e.graphQLErrors[0].message] })
      })
  }, [logIn, client, returnTo, history, setLoading, setErrors])

  return (
    <LoginForm
      className={className}
      returnTo={returnTo}
      loading={loading}
      email={email}
      password={password}
      errors={errors}
      onEmailChanged={setEmail}
      onPasswordChanged={setPassword}
      onSubmit={submit}
    />
  )
}

Login.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  returnTo: PropTypes.oneOfType([
    ReactRouterPropTypes.location,
    PropTypes.string,
  ]),
}

Login.defaultProps = {
  returnTo: '/',
}

export default compose(withApollo, withRouter)(Login)
