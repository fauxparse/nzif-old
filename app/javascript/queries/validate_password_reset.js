import gql from 'graphql-tag'

export default gql`
  query validatePasswordReset($token: String!) {
    validatePasswordReset(token: $token)
  }
`
