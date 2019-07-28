import gql from 'graphql-tag'
import { CURRENT_USER_FIELDS } from '../current_user'

export default gql`
  mutation logInMutation($email: String!, $password: String!) {
    logIn(email: $email, password: $password) {
      ...CurrentUserFields
    }
  }

  ${CURRENT_USER_FIELDS}
`
