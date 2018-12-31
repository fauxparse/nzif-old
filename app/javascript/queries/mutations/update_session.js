import gql from 'graphql-tag'

export default gql`
  mutation UpdateSession($id: ID!, $startsAt: Time!, $endsAt: Time!) {
    updateSession(id: $id, startsAt: $startsAt, endsAt: $endsAt) {
      id
      activityId
      startsAt
      endsAt
    }
  }
`
