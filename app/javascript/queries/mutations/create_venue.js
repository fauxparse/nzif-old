import gql from 'graphql-tag'

export default gql`
  mutation CreateVenue($attributes: VenueAttributes!) {
    createVenue(attributes: $attributes) {
      id
      name
      address
      latitude
      longitude
    }
  }
`
