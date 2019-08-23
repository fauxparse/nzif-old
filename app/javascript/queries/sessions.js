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
