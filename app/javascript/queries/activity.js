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

      image {
        name
        thumbnail
        small
        medium
        full
      }

      ...on Workshop {
        levels
      }

      associated {
        id
        name
        type
        url

        sessions {
          startsAt
        }
      }

      festival {
        year
      }

      presenters {
        id
        name
        origin
        bio
        image {
          thumbnail
          small
        }
      }

      sessions {
        id
        startsAt
        endsAt

        activity {
          id
        }

        venue {
          id
          name
          address
        }
      }
    }
  }
`
