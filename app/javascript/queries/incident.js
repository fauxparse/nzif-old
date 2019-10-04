import gql from 'graphql-tag'

export default gql`
  query incident($id: ID!) {
    incident(id: $id) {
      id
      state
      body
      createdAt
      user {
        name
      }
    }
  }
`
