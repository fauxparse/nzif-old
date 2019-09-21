import gql from 'graphql-tag'

export default gql`
  query Payments($year: ID!) {
    payments(year: $year) {
      id
      type
      amount
      state
      createdAt
      registration {
        id
        user {
          id
          name
        }
      }
    }
  }
`