import gql from 'graphql-tag'

export default gql`
  query Calendar($year: ID!) {
    sessions(year: $year) {
      id
      startsAt
      endsAt

      activity {
        id
        name
        type
        url
      }

      venue {
        id
        name
        address
      }
    }

    registration(year: $year) {
      id
      state
      workshops
    }

    presenting(year: $year) {
      id
    }
  }
`
