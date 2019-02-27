import gql from 'graphql-tag'

export default gql`
  mutation UpdateUser($id: ID!, $attributes: UserAttributes!) {
    updateUser(id: $id, attributes: $attributes) {
      id
      name
      email
      roles

      image {
        thumbnail
        small
        medium
        full
      }
    }
  }
`
