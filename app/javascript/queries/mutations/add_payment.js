import gql from 'graphql-tag'

export default gql`
  mutation AddPayment($attributes: PaymentAttributes!) {
    addPayment(attributes: $attributes) {
      id
      type
      amount
      state
      createdAt
      reference
      description
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
