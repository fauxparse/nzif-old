import gql from 'graphql-tag'

export default gql`
  query prices($year: ID!) {
    festival(year: $year) {
      year
      prices {
        quantity
        amount
      }
    }
  }
`
