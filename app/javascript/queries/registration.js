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
        name
        city
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
        description
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
          name
          slug
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
