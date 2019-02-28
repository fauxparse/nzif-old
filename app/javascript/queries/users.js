import gql from 'graphql-tag'

export default gql`
  {
    users {
      id
      name
      email
      roles

      image {
        small
        medium
      }
    }
  }
`
