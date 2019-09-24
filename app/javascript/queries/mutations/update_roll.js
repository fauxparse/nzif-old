import gql from 'graphql-tag'

export default gql`
  mutation UpdateRoll($id: ID!, $placements: [ID!]!, $waitlist: [ID!]!) {
    updateRoll(id: $id, placements: $placements, waitlist: $waitlist) {
      placements {
        id
        user {
          id
          name
          image {
            small
            medium
          }
        }
      }

      waitlist {
        id
        user {
          id
          name
          image {
            small
            medium
          }
        }
      }
    }
  }
`
