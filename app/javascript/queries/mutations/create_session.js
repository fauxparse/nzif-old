import gql from 'graphql-tag'

export default gql`
  mutation CreateSession($activityId: ID!, $startsAt: Time!, $endsAt: Time!) {
    createSession(activityId: $activityId, startsAt: $startsAt, endsAt: $endsAt) {
      id
      activityId
      startsAt
      endsAt
    }
  }
`
