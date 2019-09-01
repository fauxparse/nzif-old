import gql from 'graphql-tag'
import { ACTIVITY_SUMMARY_FIELDS } from './activities_by_day'

export default gql`
  query SessionsByDay($year: ID!, $type: ActivityType!) {
    festival(year: $year) {
      year

      sessions(type: $type) {
        id
        startsAt
        endsAt

        activity {
          ...ActivitySummaryFields
        }


        venue {
          id
          name
          address
        }
      }
    }
  }
  ${ACTIVITY_SUMMARY_FIELDS}
`
