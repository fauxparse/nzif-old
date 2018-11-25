import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'react-router-dom'
import { Label, Input } from '../form'
import Form, { Field, SubmitButton } from './form'
import TextLink from '../shared/text_link'
import { slideLeft } from '../page_transition'
import { CURRENT_USER_QUERY } from '../../queries'

export const LOG_IN_MUTATION = gql`
  mutation logInMutation($email: String!, $password: String!) {
    logIn(email: $email, password: $password) {
      id
      name
      email
      notificationsCount
    }
  }
`

class LogInForm extends React.Component {
  state = { email: '', password: '', loading: false, errors: [] }

  emailField = React.createRef()

  componentDidMount() {
    this.emailField.current.focus()
  }

  submit = (e) => {
    e.preventDefault()

    const { email, password } = this.state
    const { mutate, history } = this.props
    const redirect = this.props.lastLocation || '/'

    this.setState({ errors: [], loading: true })
    mutate({
      variables: { email, password },
      update: (proxy, { data }) => {
        proxy.writeQuery({
          query: CURRENT_USER_QUERY,
          data: { currentUser: data.logIn },
        })
        history.push(redirect)
      }
    }).catch(e => this.setState({ errors: e.graphQLErrors, loading: false }))
  }

  fieldChanged = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  render() {
    const { loading, email, password, errors } = this.state

    return (
      <Form
        title="Kia ora."
        message="Please log in to continue."
        className={this.props.className}
        loading={loading}
        errors={errors}
        onSubmit={this.submit}
      >
        <Field>
          <Label htmlFor="login-email">Email address</Label>
          <Input
            ref={this.emailField}
            id="login-email"
            type="email"
            name="email"
            value={email}
            autoComplete="username email"
            onChange={this.fieldChanged}
          />
        </Field>
        <Field>
          <Label htmlFor="login-password">Password</Label>
          <Input
            id="login-password"
            type="password"
            name="password"
            value={password}
            autoComplete="current-password"
            onChange={this.fieldChanged}
          />
        </Field>
        <SubmitButton primary type="submit" text="Log in" key="submit" />
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
}

LogInForm.propTypes = {
  className: PropTypes.string,
  history: PropTypes.object.isRequired,
  mutate: PropTypes.func.isRequired,
  lastLocation: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({ pathname: PropTypes.string }),
  ]),
}

export default withRouter(graphql(LOG_IN_MUTATION)(LogInForm))
