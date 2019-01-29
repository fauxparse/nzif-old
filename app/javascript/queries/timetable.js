import gql from 'graphql-tag'

export default gql`
  query Timetable($year: Int!) {
    festival(year: $year) {
      year
      startDate
      endDate

      activities {
        id
        name
        type
        url
      }
    }

    sessions(year: $year) {
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

    activityTypes
  }
`
