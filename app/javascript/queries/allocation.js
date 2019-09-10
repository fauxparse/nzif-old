import gql from 'graphql-tag'

export default gql`
  query allocation($year: ID!, $seed: BigInt) {
    allocation(year: $year, seed: $seed) {
      seed
      timeslots {
        startsAt
        sessions {
          sessionId
          registrationIds
        }
        unallocated
      }
    }

    registrations(year: $year) {
      id

      user {
        id
        name
      }

      preferences {
        sessionId
        position
      }
    }

    sessions(year: $year, type: "workshop") {
      id
      startsAt
      endsAt
      capacity

      activity {
        name
      }
    }
  }
`
