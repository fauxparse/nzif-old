import gql from 'graphql-tag'

export default gql`
  {
    currentUser {
      id
      name
      email
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
