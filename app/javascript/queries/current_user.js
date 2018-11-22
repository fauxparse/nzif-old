import gql from 'graphql-tag'

export default gql`
  {
    currentUser {
      id
      name
      email
      notificationsCount
    }
  }
`
