import gql from 'graphql-tag'

export default gql`
  query EditUser($id: ID) {
    user(id: $id) {
      id
      name
      email
      bio
      city
      country
      roles
      notificationsCount

      image {
        name
        thumbnail
        small
        medium
        full
      }
    }
  }
`
