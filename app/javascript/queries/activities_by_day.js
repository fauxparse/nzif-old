import gql from 'graphql-tag'

export default gql`
  query ActivitiesByDay($year: ID!, $type: ActivityType!) {
    festival(year: $year) {
      year

      days {
        date
        activities(type: $type) {
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
`
