import gql from 'graphql-tag'

export default gql`
  mutation UpdateRegistration($year: ID!, $attributes: RegistrationAttributes!) {
    updateRegistration(year: $year, attributes: $attributes) {
      name
      email
      phone
      codeOfConductAcceptedAt
      preferences {
        sessionId
        position
      }
    }
  }
`
