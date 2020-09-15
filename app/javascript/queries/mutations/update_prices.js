import gql from 'graphql-tag'

export default gql`
  mutation UpdatePrices($year: ID!, $prices: [Int!]!) {
    updatePrices(year: $year, prices: $prices) {
      quantity
      amount
    }
  }
`
