import gql from 'graphql-tag'

export default gql`
  mutation UpdateActivity($id: ID!, $attributes: ActivityAttributes!) {
    updateActivity(id: $id, attributes: $attributes) {
      id
      name
      type
      slug
      url

      image {
        thumbnail
      }

      ...on Workshop {
        levels
      }

      sessions {
        id
        startsAt
        endsAt
        activityId
      }
    }
  }
`
