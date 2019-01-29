import gql from 'graphql-tag'

export default gql`
  query Venues {
    venues {
      id
      name
      address
      latitude
      longitude
    }
  }
`
