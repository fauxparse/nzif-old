import gql from 'graphql-tag'
import { ACTIVITY_SUMMARY_FIELDS } from './activities_by_day'

export default gql`
  query registrationForm($year: ID!) {
    registration(year: $year) {
      name
      email
      phone
      codeOfConductAcceptedAt
      preferences {
        sessionId
        position
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
    }
  }
  ${ACTIVITY_SUMMARY_FIELDS}
`
