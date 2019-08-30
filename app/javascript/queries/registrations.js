import gql from 'graphql-tag'

export default gql`
  query registrations($year: ID!) {
    registrations(year: $year) {
      id
      state
      completedAt
      user {
        id
        name
        image {
          thumbnail
          small
          medium
        }
      }
    }
  }
`
