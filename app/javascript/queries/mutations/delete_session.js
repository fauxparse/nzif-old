import gql from 'graphql-tag'

export default gql`
  mutation DeleteSession($id: ID!) {
    deleteSession(id: $id)
  }
`
