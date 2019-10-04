import gql from 'graphql-tag'

export default gql`
  query incidents($year: ID!) {
    incidents(year: $year) {
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
