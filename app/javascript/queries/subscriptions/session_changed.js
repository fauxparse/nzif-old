import gql from 'graphql-tag'

export default gql`
  subscription {
    sessionChanged {
      id
      capacity
      placementsCount
      full
    }
  }
`
