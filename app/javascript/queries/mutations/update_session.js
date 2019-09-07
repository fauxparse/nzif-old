import gql from 'graphql-tag'

export default gql`
  mutation UpdateSession($id: ID!, $attributes: SessionAttributes!) {
    updateSession(id: $id, attributes: $attributes) {
      id
      startsAt
      endsAt
      capacity

      activity {
        id
      }

      venue {
        id
        name
        address
        latitude
        longitude
      }
    }
  }
`
