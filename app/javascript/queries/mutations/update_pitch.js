import gql from 'graphql-tag'
import { PITCH_FRAGMENT } from '../pitch'

export default gql`
  mutation UpdatePitch($year: ID, $attributes: PitchAttributes!) {
    updatePitch(year: $year, attributes: $attributes) {
      ...PitchFragment
    }
  }

  ${PITCH_FRAGMENT}
`
