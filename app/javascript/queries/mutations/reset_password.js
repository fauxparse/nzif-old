import gql from 'graphql-tag'
import { CURRENT_USER_FIELDS } from '../current_user'

export default gql`
  mutation resetPassword($token: String!, $password: String!, $passwordConfirmation: String!) {
    resetPassword(token: $token, password: $password, passwordConfirmation: $passwordConfirmation) {
      ...CurrentUserFields
    }
  }

  ${CURRENT_USER_FIELDS}
`
