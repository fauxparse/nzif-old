import gql from 'graphql-tag'

export const PITCH_FRAGMENT = gql`
  fragment PitchFragment on Pitch {
    id
    festival {
      year
      startDate
      endDate
      slots {
        startsAt
        endsAt
        activityType
      }
    }
    state
    name
    presenters {
      id
      name
      email
      city
      country
    }
    company
    bio
    presentedBefore
    availability
    nzBased
    payment
    transport
    expenses
    codeOfConduct
    activityType
    activityLevels
    workshopDescription
    workshopRequirements
    participantCount
    taughtBefore
    otherInfo
    showDescription
    castSize
    casting
    castDetails
    castRequirements
    performedBefore
    experience
    accessibility
    slots
    pile
    gender
    origin
  }
`

export const PITCH_QUERY = gql`
  query ($year: ID!, $id: ID) {
    pitch(year: $year, id: $id) {
      ...PitchFragment
    }
  }

  ${PITCH_FRAGMENT}
`

export const UPDATE_PITCH_MUTATION = gql`
  mutation UpdatePitch($year: ID, $attributes: PitchAttributes!) {
    updatePitch(year: $year, attributes: $attributes) {
      ...PitchFragment
    }
  }

  ${PITCH_FRAGMENT}
`

export default PITCH_QUERY
