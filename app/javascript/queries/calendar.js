import gql from 'graphql-tag'

export default gql`
  query Calendar($year: ID!) {
    sessions(year: $year) {
      id
      startsAt
      endsAt

      activity {
        id
        name
        type
        url
      }

      venue {
        id
        name
        address
      }
    }

    registration(year: $year) {
      id
      state
      workshops
      excluded
    }

    presenting(year: $year) {
      id
    }
  }
`

export const UPDATE_EXCLUSIONS = gql`
  mutation updateExclusions($registrationId: ID!, $ids: [ID!]!) {
    updateCalendarExclusions(registrationId: $registrationId, ids: $ids)
  }
`
