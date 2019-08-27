import gql from 'graphql-tag'
import { ACTIVITY_SUMMARY_FIELDS } from './activities_by_day'

export default gql`
  query registrationForm($year: ID!) {
    registration(year: $year) {
      id
      name
      email
      phone
      codeOfConductAcceptedAt
      user {
        id
      }
      preferences {
        sessionId
        position
      }
      availability {
        sessionId
        role
      }
      prices
    }

    festival(year: $year) {
      year
      sessions(type: "workshop") {
        id
        startsAt
        endsAt

        activity {
          ...ActivitySummaryFields
        }
      }
      activities(type: "show", slug: "all-in") {
        sessions {
          id
          startsAt
          endsAt
        }
      }
    }
  }
  ${ACTIVITY_SUMMARY_FIELDS}
`
