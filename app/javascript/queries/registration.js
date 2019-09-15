import gql from 'graphql-tag'

export default gql`
  query registration($year: ID!, $id: ID) {
    registration(year: $year, id: $id) {
      id
      name
      email
      phone
      state
      completedAt
      codeOfConductAcceptedAt
      user {
        id
        image {
          thumbnail
          small
          medium
        }
      }
      preferences {
        sessionId
        position
      }
      availability {
        sessionId
        role
      }
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
          name
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
`
