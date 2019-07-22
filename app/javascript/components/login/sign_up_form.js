import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import ReactRouterPropTypes from 'react-router-prop-types'
import { withApollo, compose } from 'react-apollo'
import { useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { withRouter } from 'react-router-dom'
import { Field, Label, Input, Error } from '../form'
import Button from '../../atoms/button'
import Form from './form'
import TextLink from '../shared/text_link'
import { slideRight } from '../page_transition'
import { CURRENT_USER_QUERY } from '../../queries'
import SocialLogin from './social_login'

export const SIGN_UP_MUTATION = gql`
  mutation signUpMutation(
    $name: String!,
    $email: String!,
    $password: String!,
    $passwordConfirmation: String!
  ) {
    signUp(
      name: $name,
      email: $email,
      password: $password,
      passwordConfirmation: $passwordConfirmation
    ) {
      id
      name
      email
      city
      country
      roles
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

const SignUpForm = ({ className, client, history, lastLocation }) => {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    loading: false,
    errors: [],
  })

  const { name, email, password, passwordConfirmation, loading, errors } = state

  const nameField = useRef()

  useEffect(() => {
    if (nameField.current) {
      nameField.current.focus()
    }
  }, [nameField])

  const signUp = useMutation(SIGN_UP_MUTATION, {
    update: (proxy, { data }) => {
      proxy.writeQuery({
        query: CURRENT_USER_QUERY,
        data: { currentUser: data.signUp },
      })
    }
  })

  const submit = (e) => {
    e.preventDefault()

    setState({ ...state, errors: [], loading: true })

    signUp({ variables: { name, email, password, passwordConfirmation } })
      .then(() => client.resetStore())
      .then(() => history.push(lastLocation || '/'))
      .catch((e) => {
        console.log(e)
        const error = { ...e.graphQLErrors[0], message: 'Please check the errors below.' }
        setState({ ...state, errors: [error], loading: false })
      })
  }

  const fieldChanged = ({ target }) => {
    const { name, value } = target
    setState({ ...state, [name]: value })
  }

  const errorMessageFor = (field) => {
    const { detail } = errors[0] || {}
    if (detail) {
      return (detail[field] || []).map(message => <Error key={message}>{message}</Error>)
    }
  }

  return (
    <Form
      title="Haere mai."
      message="Let’s get you all set up."
      className={className}
      loading={loading}
      errors={errors}
      onSubmit={submit}
    >
      <Field className="login__field">
        <Label htmlFor="signup-name">Name</Label>
        <Input
          ref={nameField}
          id="signup-name"
          type="text"
          name="name"
          value={name}
          autoComplete="name"
          onChange={fieldChanged}
        />
        {errorMessageFor('name')}
      </Field>
      <Field className="login__field">
        <Label htmlFor="signup-email">Email address</Label>
        <Input
          id="signup-email"
          type="email"
          name="email"
          value={email}
          autoComplete="username email"
          onChange={fieldChanged}
        />
        {errorMessageFor('email')}
      </Field>
      <Field className="login__field">
        <Label htmlFor="signup-password">Password</Label>
        <Input
          id="signup-password"
          type="password"
          name="password"
          value={password}
          autoComplete="new-password"
          onChange={fieldChanged}
        />
        {errorMessageFor('password')}
      </Field>
      <Field className="login__field">
        <Label htmlFor="signup-password-confirmation">Confirm password</Label>
        <Input
          id="signup-password-confirmation"
          type="password"
          name="passwordConfirmation"
          value={passwordConfirmation}
          autoComplete="new-password"
          onChange={fieldChanged}
        />
        {errorMessageFor('passwordConfirmation')}
      </Field>
      <div className="login__buttons">
        <Button
          className="login__submit"
          primary
          type="submit"
          text="Create account"
          key="submit"
        />
        <SocialLogin platform="google" returnTo={lastLocation} />
        <SocialLogin platform="facebook" returnTo={lastLocation} />
        <SocialLogin platform="twitter" returnTo={lastLocation} />
      </div>
      <p>
        Already signed up?{' '}
        <TextLink replace to={{ pathname: 'login', state: { transition: slideRight } }}>
          Log in here
        </TextLink>
        .
      </p>
    </Form>
  )
}

SignUpForm.propTypes = {
  className: PropTypes.string,
  history: PropTypes.object.isRequired,
  lastLocation: PropTypes.oneOfType([ReactRouterPropTypes.location, PropTypes.string ]),
  client: PropTypes.shape({
    resetStore: PropTypes.func.isRequired,
  }).isRequired,
}

export default compose(withApollo, withRouter)(SignUpForm)
