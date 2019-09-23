import gql from 'graphql-tag'

export default gql`
  query History($before: ID, $query: String) {
    history(before: $before, query: $query) {
      type
      id
      icon
      description
      timestamp
    }
  }
`