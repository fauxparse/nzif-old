import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { PITCHES_QUERY } from '../../queries'
import CommonProps from '../../lib/common_props'
import Icon from '../icons'
import Button from '../button'
import Sentence from '../shared/sentence'
import Link from '../shared/ripple/link'
import { left as transition } from '../page_transition/slide'
import DeleteButton from './delete_button'

const DELETE_PITCH_MUTATION = gql`
  mutation DeletePitch($id: ID!) {
    deletePitch(id: $id)
  }
`

const Pitch = ({ className, pitch, url, onDelete }) => {
  const variables = { year: pitch.festival.year }
  const deletePitch = useMutation(DELETE_PITCH_MUTATION, {
    update: (proxy) => {
      const { pitches } = proxy.readQuery({ query: PITCHES_QUERY, variables })
      proxy.writeQuery({
        query: PITCHES_QUERY,
        variables,
        data: {
          pitches: pitches.filter(({ id }) => pitch.id !== id)
        }
      })
    },
    optimisticResponse: { deletePitch: true },
  })

  return (
    <div
      className={classNames('pitch-row', className)}
      data-state={pitch.state}
    >
      <Icon className="pitch-row__icon" name="pitch" />
      <div className="pitch-row__name">
        {pitch.name || '(Untitled pitch)'}
      </div>
      <div className="pitch-row__presenters">
        <Sentence>{pitch.presenters.map(p => p.name)}</Sentence>
      </div>
      <div className="pitch-row__state">
        {pitch.state}
      </div>
      {pitch.state === 'draft' &&
        <div className="pitch-row__actions">
          <Link
            className="button"
            to={{
              pathname: url,
              state: { transition }
            }}
            onClick={onDelete}
          >
            <Button.Icon name="edit" />
            <Button.Text>Edit</Button.Text>
          </Link>
          <DeleteButton onClick={() => deletePitch({ variables: { id: pitch.id } })} />
        </div>
      }
    </div>
  )
}

Pitch.propTypes = {
  pitch: PropTypes.shape({
    id: CommonProps.id.isRequired,
    name: PropTypes.string,
    state: PropTypes.string,
  }),
  url: PropTypes.string.isRequired,
}

export default Pitch
