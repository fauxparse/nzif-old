import gql from 'graphql-tag'

export default gql`
  mutation UpdateSession($id: ID!, $attributes: SessionAttributes!) {
    updateSession(id: $id, attributes: $attributes) {
      id
      startsAt
      endsAt

      activity {
        id
      }

      venue {
        id
        name
      }
    }
  }
`
