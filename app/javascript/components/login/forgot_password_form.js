import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'lib/proptypes'
import ReactRouterPropTypes from 'react-router-prop-types'
import { useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { withRouter } from 'react-router-dom'
import { Label, Input, Field } from '../form'
import Button from '../../atoms/button'
import Form from './form'

export const FORGOT_PASSWORD_MUTATION = gql`
  mutation forgotPasswordMutation($email: String!) {
    requestPasswordReset(email: $email)
  }
`

const ForgotPasswordForm = ({ className }) => {
  const [state, setState] = useState({
    email: '',
    loading: false,
    sent: undefined,
    errors: [],
  })
  const { email, loading, errors } = state

  const emailField = useRef()

  useEffect(() => {
    if (emailField.current) {
      emailField.current.focus()
    }
  }, [emailField])

  const fieldChanged = (e) => setState({ ...state, [e.target.name]: e.target.value })

  const sendResetRequest = useMutation(FORGOT_PASSWORD_MUTATION, {
    update: (proxy, { data: { requestPasswordReset: sent } }) => {
      setState({ ...state, sent })
    }
  })

  const submit = (e) => {
    e.preventDefault()

    setState({ ...state, errors: [], loading: true })

    sendResetRequest({ variables: { email } })
      .catch(e => setState({ ...state, errors: e.graphQLErrors, loading: false }))
  }

  if (state.sent === false || state.errors.length) {
    return (
      <div className="login__form">
        <div className="login__fieldset">
          <h2 className="login__title">Sorry, but…</h2>
          <p>
            We couldn’t reset your password.
            <br/>
            Are you sure you’ve signed up and that <b>{email}</b> is the correct email address?
          </p>
        </div>
      </div>
    )
  } else if (state.sent === true) {
    return (
      <div className="login__form">
        <div className="login__fieldset">
          <h2 className="login__title">Check your email</h2>
          <p>We’ve sent you a one-time link to reset your password.</p>
        </div>
      </div>
    )
  } else {
    return (
      <Form
        title="Forgot your password?"
        message="Enter your email address below to reset your password"
        className={className}
        loading={loading}
        errors={errors}
        onSubmit={submit}
      >
        <Field className="login__field">
          <Label htmlFor="login-email">Email address</Label>
          <Input
            ref={emailField}
            id="login-email"
            type="email"
            name="email"
            value={email}
            autoComplete="username email"
            onChange={fieldChanged}
          />
        </Field>
        <div className="login__buttons">
          <Button
            className="login__submit"
            primary
            type="submit"
            text="Reset my password"
            key="submit"
          />
        </div>
      </Form>
    )
  }
}

ForgotPasswordForm.propTypes = {
  className: PropTypes.className,
  history: ReactRouterPropTypes.history.isRequired,
  lastLocation: PropTypes.oneOfType([ReactRouterPropTypes.location, PropTypes.string ]),
}

export default withRouter(ForgotPasswordForm)
