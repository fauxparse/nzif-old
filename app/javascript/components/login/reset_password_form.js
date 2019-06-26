import React, { useReducer, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useMutation, useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import CURRENT_USER_QUERY, { CURRENT_USER_FIELDS } from '../../queries/current_user'
import { Label, Input, Field } from '../form'
import Loader from '../shared/loader'
import TextLink from '../shared/text_link'
import Button from '../../atoms/button'
import Form from './form'

const VALIDATE_TOKEN_QUERY = gql`
  query validatePasswordResetQuery($token: String!) {
    validatePasswordReset(token: $token)
  }
`

const RESET_PASSWORD_MUTATION = gql`
  mutation resetPassword($token: String!, $password: String!, $passwordConfirmation: String!) {
    resetPassword(token: $token, password: $password, passwordConfirmation: $passwordConfirmation) {
      ...CurrentUserFields
    }
  }

  ${CURRENT_USER_FIELDS}
`

const useTokenValidation = (token) => {
  const {
    data: { validatePasswordReset: validToken } = {},
    loading,
  } = useQuery(VALIDATE_TOKEN_QUERY, {
    variables: { token },
  })

  return [loading, validToken]
}

const useEditableFields = (initial) => {
  const [state, dispatch] = useReducer(
    (state, { name, value }) => ({
      ...state,
      [name]: value,
    }),
    initial
  )

  const changed = ({ target: { name, value } }) => dispatch({ name, value })
  return [state, changed]
}

const ResetPasswordForm = ({
  history,
  lastLocation,
  match: { params: { token } },
}) => {
  const [validating, validToken] = useTokenValidation(token)
  const [{ password, passwordConfirmation }, fieldChanged] = useEditableFields({
    password: '',
    passwordConfirmation: '',
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState([])

  const resetPassword = useMutation(RESET_PASSWORD_MUTATION, {
    update: (proxy, { data }) => {
      proxy.writeQuery({
        query: CURRENT_USER_QUERY,
        data: { currentUser: data.resetPassword },
      })
    }
  })

  const submit = (e) => {
    e.preventDefault()

    setLoading(true)

    resetPassword({ variables: { token, password, passwordConfirmation } })
      .then(() => history.push(lastLocation || '/'))
      .catch(e => {
        setErrors(e.graphQLErrors)
        setLoading(false)
      })
  }

  if (validating) {
    return <Loader />
  } else if (validToken) {
    return (
      <Form
        title="Reset your password."
        message="Enter a new password below."
        loading={loading}
        errors={errors}
        onSubmit={submit}
      >
        <Field className="login__field">
          <Label htmlFor="new-password">New password</Label>
          <Input
            id="new-password"
            type="password"
            name="password"
            value={password}
            onChange={fieldChanged}
          />
        </Field>
        <Field className="login__field">
          <Label htmlFor="new-password-confirmation">Confirm password</Label>
          <Input
            id="new-password-confirmation"
            type="password"
            name="passwordConfirmation"
            value={passwordConfirmation}
            onChange={fieldChanged}
          />
        </Field>
        <div className="login__buttons">
          <Button className="login__submit" primary type="submit" text="Change password" />
        </div>
      </Form>
    )
  } else {
    return (
      <div className="login__form">
        <div className="login__fieldset">
          <h2 className="login__title">Sorry.</h2>
          <p>That link isn’t valid. Maybe it’s expired?</p>
          <TextLink to="/password/forgot">Start again?</TextLink>
        </div>
      </div>
    )
  }
}

export default withRouter(ResetPasswordForm)
