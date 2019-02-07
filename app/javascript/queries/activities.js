import gql from 'graphql-tag'

export default gql`
  query Activities($year: Int!, $type: ActivityType!) {
    festival(year: $year) {
      year

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
          full
        }

        ...on Workshop {
          levels
        }

        presenters {
          id
          name
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
`
