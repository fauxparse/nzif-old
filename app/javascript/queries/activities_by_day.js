import gql from 'graphql-tag'

export const ACTIVITY_SUMMARY_FIELDS = gql`
  fragment ActivitySummaryFields on Activity {
    id
    name
    type
    slug
    url
    description

    image {
      name
      thumbnail
      small
      medium
    }

    ...on Workshop {
      levels
    }

    presenters {
      id
      name
      image {
        small
        medium
      }
    }
  }
`

export const SESSIONS = gql`
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

export default gql`
  query ActivitiesByDay($year: ID!, $type: ActivityType!) {
    festival(year: $year) {
      year

      days {
        date
        activities(type: $type) {
          ...ActivitySummaryFields

          sessions {
            id
            startsAt
            endsAt

            activity {
              id
            }

            venue {
              id
              name
              address
            }
          }
        }
      }
    }
  }
  ${ACTIVITY_SUMMARY_FIELDS}
`
