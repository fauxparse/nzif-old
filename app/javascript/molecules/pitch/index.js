import React, { useMemo } from 'react'
import PropTypes from 'lib/proptypes'
import Sentence from 'atoms/sentence'
import Tag from 'atoms/tag'
import List from 'molecules/list'
import { ACTIVITY_TYPES } from 'components/pitches/constants'

import './index.scss'

const Pitch = ({ location, pitch, ...props }) => {
  const activityType = useMemo(() => (
    ACTIVITY_TYPES.find(type => type.name === pitch.activityType)
  ), [pitch])

  return (
    <List.Link
      className="pitch"
      to={location}
      avatar={pitch.presenters[0]}
      secondaryIcon="chevron-right"
      {...props}
    >
      <div className="pitch__type">
        {activityType.title}
      </div>
      <span className="list-item__primary">
        {pitch.name}
      </span>
      <span className="list-item__secondary">
        <span className="pitch__presenters">
          <Sentence>
            {pitch.presenters.map(presenter => presenter.name)}
          </Sentence>
        </span>
        {pitch.pile && <Tag>{pitch.pile}</Tag>}
        {pitch.gender && <Tag>{pitch.gender}</Tag>}
        {pitch.origin && <Tag>{pitch.origin}</Tag>}
      </span>
    </List.Link>
  )
}

Pitch.propTypes = {
  location: PropTypes.location.isRequired,
  pitch: PropTypes.pitch.isRequired,
}

export default Pitch
