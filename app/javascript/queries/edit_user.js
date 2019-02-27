import gql from 'graphql-tag'

export default gql`
  {
    currentUser {
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
