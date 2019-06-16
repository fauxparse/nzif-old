import gql from 'graphql-tag'

export default gql`
  query Pitches($year: ID!) {
    pitches(year: $year) {
      id
      festival {
        year
      }
      state
      name
      activityType
      pile
      gender
      origin
      presenters {
        id
        name
        image {
          small
          medium
        }
      }
    }
  }
`
