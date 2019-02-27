import gql from 'graphql-tag'

export default gql`
  {
    currentUser {
      id
      name
      email
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
