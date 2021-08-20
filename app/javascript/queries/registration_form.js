import gql from 'graphql-tag'
import { ACTIVITY_SUMMARY_FIELDS } from './activities_by_day'

export default gql`
  query registrationForm($year: ID!, $id: ID) {
    registration(year: $year, id: $id) {
      id
      state
      completedAt
      name
      email
      phone
      city
      codeOfConductAcceptedAt
      user {
        id
      }
      preferences {
        sessionId
        position
      }
      workshops
      waitlists
      availability {
        sessionId
        role
      }
      prices
      payments {
        id
        type
        amount
        state
        reference
        createdAt
      }
      totalToPay
    }

    festival(year: $year) {
      year
      state
      sessions(type: "workshop") {
        id
        startsAt
        endsAt
        capacity
        full

        activity {
          ...ActivitySummaryFields

          associated {
            id
            name
            type
          }
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
