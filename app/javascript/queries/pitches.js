import gql from 'graphql-tag'

export default gql`
  query Pitches($year: ID!, $states: [String!], $userId: ID) {
    pitches(year: $year, states: $states, userId: $userId) {
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
        email
        image {
          small
          medium
        }
      }
    }
  }
`
