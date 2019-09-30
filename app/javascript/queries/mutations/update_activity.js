import gql from 'graphql-tag'

export default gql`
  mutation UpdateActivity($id: ID!, $attributes: ActivityAttributes!) {
    updateActivity(id: $id, attributes: $attributes) {
      id
      name
      type
      slug
      url

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
