import gql from 'graphql-tag'

export default gql`
  mutation DeleteVenue($id: ID!) {
    deleteVenue(id: $id)
  }
`
