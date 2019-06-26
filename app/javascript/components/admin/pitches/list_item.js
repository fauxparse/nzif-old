import React, { useMemo } from 'react'
import PropTypes from 'lib/proptypes'
import Link from '../../shared/ripple/link'
import Avatar from 'atoms/avatar'
import Sentence from '../../shared/sentence'
import Icon from 'atoms/icon'
import { ACTIVITY_TYPES } from '../../pitches/constants'

const ListItem = ({ baseUrl, pitch }) => {
  const activityType = useMemo(() => (
    ACTIVITY_TYPES.find(type => type.name === pitch.activityType)
  ), [pitch])

  return (
    <li className="list__item pitch">
      <Link
        to={`${baseUrl}/${pitch.id}`}
        className="list__link"
        activeClassName="list__link--active"
      >
        <Icon name="pitch" className="list__icon" />
        <span className="list__details">
          <span className="pitch__type">
            {activityType.title}
          </span>
          <span className="pitch__name list__title">
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
        </span>
      </Link>
    </li>
  )
}

ListItem.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  pitch: PropTypes.shape({
    id: PropTypes.id.isRequired,
    name: PropTypes.string.isRequired,
  }),
}

export default ListItem
