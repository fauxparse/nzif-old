import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'react-router-dom'
import { Label, Input, Error } from '../form'
import Form, { Field, SubmitButton } from './form'
import TextLink from '../shared/text_link'
import { slideRight } from '../page_transition'
import { CURRENT_USER_QUERY } from '../../queries'

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
    }
  }
`

class SignUpForm extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    loading: false,
    errors: [],
  }

  nameField = React.createRef()

  componentDidMount() {
    this.nameField.current.focus()
  }

  submit = (e) => {
    e.preventDefault()

    const { name, email, password, passwordConfirmation } = this.state
    const { mutate, history } = this.props
    const redirect = this.props.lastLocation || '/'

    this.setState({ errors: [], loading: true })
    mutate({
      variables: { name, email, password, passwordConfirmation },
      update: (proxy, { data }) => {
        proxy.writeQuery({
          query: CURRENT_USER_QUERY,
          data: { currentUser: data.signUp },
        })
        history.push(redirect)
      }
    }).catch(e => {
      const error = {
        ...e.graphQLErrors[0],
        message: 'Please check the errors below.',
      }
      this.setState({ errors: [error], loading: false })
    })
  }

  fieldChanged = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  errorMessageFor(field) {
    const { errors } = this.state
    if (errors.length && errors[0].detail) {
      const { detail } = this.state.errors[0]
      return (detail[field] || []).map(message => <Error key={message}>{message}</Error>)
    }
  }

  render() {
    const { loading, name, email, password, passwordConfirmation, errors } = this.state

    return (
      <Form
        title="Haere mai."
        message="Let’s get you all set up."
        className={this.props.className}
        loading={loading}
        errors={errors}
        onSubmit={this.submit}
      >
        <Field>
          <Label htmlFor="signup-name">Name</Label>
          <Input
            ref={this.nameField}
            id="signup-name"
            type="text"
            name="name"
            value={name}
            autoComplete="name"
            onChange={this.fieldChanged}
          />
          {this.errorMessageFor('name')}
        </Field>
        <Field>
          <Label htmlFor="signup-email">Email address</Label>
          <Input
            id="signup-email"
            type="email"
            name="email"
            value={email}
            autoComplete="username email"
            onChange={this.fieldChanged}
          />
          {this.errorMessageFor('email')}
        </Field>
        <Field>
          <Label htmlFor="signup-password">Password</Label>
          <Input
            id="signup-password"
            type="password"
            name="password"
            value={password}
            autoComplete="new-password"
            onChange={this.fieldChanged}
          />
          {this.errorMessageFor('password')}
        </Field>
        <Field>
          <Label htmlFor="signup-password-confirmation">Confirm password</Label>
          <Input
            id="signup-password-confirmation"
            type="password"
            name="passwordConfirmation"
            value={passwordConfirmation}
            autoComplete="new-password"
            onChange={this.fieldChanged}
          />
          {this.errorMessageFor('passwordConfirmation')}
        </Field>
        <SubmitButton primary type="submit" text="Create account" key="submit" />
        <p>
          Already signed up?{' '}
          <TextLink to={{ pathname: 'login', state: { transition: slideRight } }}>
            Log in here
          </TextLink>
          .
        </p>
      </Form>
    )
  }
}

SignUpForm.propTypes = {
  className: PropTypes.string,
  history: PropTypes.object.isRequired,
  mutate: PropTypes.func.isRequired,
  lastLocation: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({ pathname: PropTypes.string }),
  ]),
}

export default withRouter(graphql(SIGN_UP_MUTATION)(SignUpForm))
