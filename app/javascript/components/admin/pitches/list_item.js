import React, { useMemo } from 'react'
import PropTypes from 'lib/proptypes'
import Avatar from 'atoms/avatar'
import List from 'molecules/list'
import Sentence from 'atoms/sentence'
import { ACTIVITY_TYPES } from '../../pitches/constants'

const ACTIVITY_TYPE_NAMES = ACTIVITY_TYPES.map(type => type.name)

const PitchItem = ({ baseUrl, pitch }) => {
  const activityType = useMemo(() => (
    ACTIVITY_TYPES.find(type => type.name === pitch.activityType)
  ), [pitch])

  return (
    <List.Link
      to={`${baseUrl}/${pitch.id}`}
      className="list-item__link pitch"
      icon="pitch"
    >
      <span className="pitch__type">
        {activityType.title}
      </span>
      <span className="pitch__name list-item__title">
        {pitch.name}
      </span>
      <span className="pitch__people">
        <Sentence>
          {pitch.presenters.map(presenter => (
            <span className="person" key={presenter.id}>
              <Avatar name={presenter.name} image={presenter.image} />
              <span>{presenter.name}</span>
            </span>
          ))}
        </Sentence>
      </span>
    </List.Link>
  )
}

PitchItem.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  pitch: PropTypes.shape({
    id: PropTypes.id.isRequired,
    name: PropTypes.string.isRequired,
    activityType: PropTypes.oneOf(ACTIVITY_TYPE_NAMES).isRequired,
    presenters: PropTypes.arrayOf(PropTypes.presenter).isRequired,
  }),
}

export default PitchItem
