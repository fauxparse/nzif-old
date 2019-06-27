import React, { useMemo } from 'react'
import PropTypes from 'lib/proptypes'
import Link from '../../shared/ripple/link'
import Avatar from 'atoms/avatar'
import ListItem from 'molecules/list_item'
import Sentence from '../../shared/sentence'
import { ACTIVITY_TYPES } from '../../pitches/constants'

const PitchItem = ({ baseUrl, pitch }) => {
  const activityType = useMemo(() => (
    ACTIVITY_TYPES.find(type => type.name === pitch.activityType)
  ), [pitch])

  return (
    <ListItem
      as={Link}
      to={`${baseUrl}/${pitch.id}`}
      className="list-item__link pitch"
      activeClassName="list-item__link--active"
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
    </ListItem>
  )
}

PitchItem.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  pitch: PropTypes.shape({
    id: PropTypes.id.isRequired,
    name: PropTypes.string.isRequired,
    activityType: PropTypes.activityType.isRequired,
    presenters: PropTypes.arrayOf(PropTypes.user).isRequired,
  }),
}

export default PitchItem
