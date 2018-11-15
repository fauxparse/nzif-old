import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'react-router-dom'
import Button from '../button'
import { CURRENT_USER_QUERY } from '../shared/header/current_user'

export const LOG_IN_MUTATION = gql`
  mutation logInMutation($email: String!, $password: String!) {
    logIn(email: $email, password: $password) {
      id
      name
      email
    }
  }
`

class LogInForm extends React.Component {
  state = { email: '', password: '', loading: false, errors: [] }

  submit = (e) => {
    e.preventDefault()

    const { email, password } = this.state
    const { mutate, history, redirect } = this.props

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

  emailChanged = e => {
    const email = e.target.value
    this.setState({ email })
  }

  passwordChanged = e => {
    const password = e.target.value
    this.setState({ password })
  }

  render() {
    const { loading, email, password, errors } = this.state

    return (
      <form
        className={this.props.className}
        onSubmit={this.submit}
        method="post"
      >
        <fieldset disabled={loading} aria-busy={loading}>
          {errors.map(({ message }) => <p key={message}>{message}</p>)}
          <input
            type="email"
            value={email}
            onChange={this.emailChanged}
          />
          <input
            type="password"
            value={password}
            onChange={this.passwordChanged}
          />
        </fieldset>
        <Button primary type="submit" text="Log in" key="submit" />
      </form>
    )
  }
}

LogInForm.propTypes = {
  className: PropTypes.string,
  history: PropTypes.object.isRequired,
  mutate: PropTypes.func.isRequired,
  redirect: PropTypes.string,
}

LogInForm.defaultProps = {
  redirect: '/'
}

export default styled(withRouter(graphql(LOG_IN_MUTATION)(LogInForm)))``
