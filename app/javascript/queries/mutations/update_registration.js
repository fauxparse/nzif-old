import gql from 'graphql-tag'

export default gql`
  mutation UpdateRegistration($year: ID!, $id: ID, $attributes: RegistrationAttributes!) {
    updateRegistration(year: $year, id: $id, attributes: $attributes) {
      id
      state
      name
      email
      phone
      codeOfConductAcceptedAt
      preferences {
        sessionId
        position
      }
      availability {
        sessionId
        role
      }
      user {
        id
        image {
          thumbnail
          small
          medium
        }
      }
    }
  }
`
