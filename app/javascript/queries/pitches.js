import gql from 'graphql-tag'

export default gql`
  query Pitches($year: ID!) {
    pitches(year: $year) {
      id
      state
      name
      presenters {
        id
        name
      }
    }
  }
`
