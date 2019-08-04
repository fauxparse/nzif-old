import gql from 'graphql-tag'

export default gql`
  mutation PromotePitch($id: ID!) {
    promotePitch(id: $id) {
      id
      type
      name
    }
  }
`
