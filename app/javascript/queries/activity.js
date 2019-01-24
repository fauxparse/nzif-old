import gql from 'graphql-tag'

export default gql`
  query Activity($year: Int!, $type: ActivityType!, $slug: String!) {
    activity(year: $year, type: $type, slug: $slug) {
      id
      name
      type
      slug
      url
      description

      ...on Workshop {
        levels
      }

      presenters {
        id
        name
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
