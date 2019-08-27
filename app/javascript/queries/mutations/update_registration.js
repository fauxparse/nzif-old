import gql from 'graphql-tag'

export default gql`
  mutation UpdateRegistration($year: ID!, $attributes: RegistrationAttributes!) {
    updateRegistration(year: $year, attributes: $attributes) {
      id
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
      }
    }
  }
`
