import gql from 'graphql-tag'

export default gql`
  mutation UpdateIncident($id: ID!, $body: String, $state: String) {
    updateIncident(id: $id, body: $body, state: $state) {
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
