import gql from 'graphql-tag'

export default gql`
  mutation UpdateVenue($id: ID!, $attributes: VenueAttributes!) {
    updateVenue(id: $id, attributes: $attributes) {
      id
      name
      address
      latitude
      longitude
    }
  }
`
