import gql from 'graphql-tag'

export default gql`
  mutation CreateSession($activityId: ID!, $attributes: SessionAttributes!) {
    createSession(activityId: $activityId, attributes: $attributes) {
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
