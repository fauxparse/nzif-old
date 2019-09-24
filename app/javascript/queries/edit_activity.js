import gql from 'graphql-tag'

export default gql`
  query Activity($year: ID!, $type: ActivityType!, $slug: String!) {
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

      festival {
        year
      }

      presenters {
        id
        name
        origin
        bio
        image {
          small
          medium
        }
      }

      sessions {
        id
        startsAt
        endsAt
        capacity

        placements {
          id
          user {
            id
            name
            image {
              small
              medium
            }
          }
        }

        waitlist {
          id
          user {
            id
            name
            image {
              small
              medium
            }
          }
        }

        activity {
          id
        }

        venue {
          id
          name
          address
          latitude
          longitude
        }
      }
    }
  }
`
