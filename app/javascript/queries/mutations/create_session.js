import gql from 'graphql-tag'

export default gql`
  mutation CreateSession($attributes: SessionAttributes!) {
    createSession(attributes: $attributes) {
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
