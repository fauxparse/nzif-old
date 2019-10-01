import gql from 'graphql-tag'

export const CURRENT_USER_FIELDS = gql`
  fragment CurrentUserFields on User {
    id
    name
    email
    city
    country
    roles
    phone
    notificationsCount
    presenter

    image {
      name
      thumbnail
      small
      medium
      full
    }
  }
`

export default gql`
  {
    currentUser {
      ...CurrentUserFields
    }
  }
  ${CURRENT_USER_FIELDS}
`
