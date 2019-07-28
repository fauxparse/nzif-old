import gql from 'graphql-tag'

export default gql`
  mutation forgotPasswordMutation($email: String!) {
    requestPasswordReset(email: $email)
  }
`
