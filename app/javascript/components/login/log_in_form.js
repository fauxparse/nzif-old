import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Redirect } from 'react-router-dom'
import Button from '../button'
import { CURRENT_USER_QUERY } from '../shared/header/current_user'

export const LOGIN_MUTATION = gql`
  mutation logInMutation($email: String!, $password: String!) {
    logIn(email: $email, password: $password) {
      id
      name
      email
    }
  }
`
class LogInForm extends React.Component {
  state = { email: '', password: '', errors: [] }

  submit = (e, logIn) => {
    e.preventDefault()
    this.setState({ errors: [] })
    logIn().catch(e => this.setState({ errors: e.graphQLErrors }))
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
    const { email, password, errors } = this.state

    return (
      <Mutation mutation={LOGIN_MUTATION} variables={{ email, password }}>
        {(logIn, { data, loading, client }) => {
          if (data && data.logIn) {
            client.writeQuery({
              query: CURRENT_USER_QUERY,
              data: { currentUser: data.logIn }
            })
            return <Redirect to={this.props.redirect} />
          }
          return (
            <form
              className={this.props.className}
              onSubmit={e => this.submit(e, logIn)}
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
        }}
      </Mutation>
    )
  }
}

LogInForm.propTypes = {
  redirect: PropTypes.string,
  className: PropTypes.string,
}

LogInForm.defaultProps = {
  redirect: '/'
}

export default styled(LogInForm)``
