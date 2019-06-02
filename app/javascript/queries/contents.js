import gql from 'graphql-tag'

export default gql`
  {
    contents {
      title
      slug
      updatedAt
    }
  }
`
