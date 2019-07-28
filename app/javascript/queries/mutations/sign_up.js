import gql from 'graphql-tag'
import { CURRENT_USER_FIELDS } from '../current_user'

export default gql`
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
      ...CurrentUserFields
    }
  }

  ${CURRENT_USER_FIELDS}
`

