import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import ReactRouterPropTypes from 'react-router-prop-types'
import { withApollo, compose } from 'react-apollo'
import { useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { withRouter } from 'react-router-dom'
import CommonProps from '../../lib/common_props'
import { Label, Input, Field } from '../form'
import Button from '../button'
import Form from './form'
import TextLink from '../shared/text_link'
import { slideLeft } from '../page_transition'
import { CURRENT_USER_QUERY } from '../../queries'
import SocialLogin from './social_login'

export const LOG_IN_MUTATION = gql`
  mutation logInMutation($email: String!, $password: String!) {
    logIn(email: $email, password: $password) {
      id
      name
      roles
      email
      city
      country
      notificationsCount

      image {
        name
        thumbnail
        small
        medium
        full
      }
    }
  }
`

const LogInForm = ({ client, history, lastLocation, className }) => {
  const [state, setState] = useState({
    email: '',
    password: '',
    loading: false,
    errors: [],
  })
  const { email, password, loading, errors } = state

  const emailField = useRef()

  useEffect(() => {
    if (emailField.current) {
      emailField.current.focus()
    }
  }, [emailField])

  const fieldChanged = (e) => setState({ ...state, [e.target.name]: e.target.value })

  const logIn = useMutation(LOG_IN_MUTATION, {
    update: (proxy, { data }) => {
      proxy.writeQuery({
        query: CURRENT_USER_QUERY,
        data: { currentUser: data.logIn },
      })
    }
  })

  const submit = (e) => {
    e.preventDefault()

    logIn({ variables: { email, password } })
      .then(() => client.resetStore())
      .then(() => history.push(lastLocation || '/'))
      .catch(e => setState({ ...state, errors: e.graphQLErrors, loading: false }))
  }

  return (
    <Form
      title="Kia ora."
      message="Please log in to continue."
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
      <Field className="login__field">
        <Label htmlFor="login-password">Password</Label>
        <Input
          id="login-password"
          type="password"
          name="password"
          value={password}
          autoComplete="current-password"
          onChange={fieldChanged}
        />
      </Field>
      <div className="login__buttons">
        <Button className="login__submit" primary type="submit" text="Log in" key="submit" />
        <SocialLogin platform="facebook" returnTo={lastLocation} />
      </div>
      <p>
        New here?{' '}
        <TextLink replace to={{ pathname: 'signup', state: { transition: slideLeft } }}>
          Create an account
        </TextLink>
        .
      </p>
    </Form>
  )
}

LogInForm.propTypes = {
  className: CommonProps.className,
  history: ReactRouterPropTypes.history.isRequired,
  lastLocation: PropTypes.oneOfType([ReactRouterPropTypes.location, PropTypes.string ]),
  client: PropTypes.shape({
    resetStore: PropTypes.func.isRequired,
  }).isRequired,
}

export default compose(withApollo, withRouter)(LogInForm)
