import gql from 'graphql-tag'

export default gql`
  query MyWorkshops($year: ID!, $presenterId: ID!) {
    sessions(year: $year, type: "workshop", presenter: $presenterId) {
      id
      startsAt
      endsAt
      capacity

      activity {
        name
      }

      venue {
        name
        address
      }

      placements {
        user {
          id
          name
          image {
            thumbnail
            small
            medium
          }
        }
      }

      waitlist {
        id
      }
    }
  }
`