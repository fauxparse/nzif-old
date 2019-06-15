import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import CommonProps from '../../../lib/common_props'
import Link from '../../shared/ripple/link'
import Avatar from '../../shared/avatar'
import Sentence from '../../shared/sentence'
import Icon from '../../icons'
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
    id: CommonProps.id.isRequired,
    name: PropTypes.string.isRequired,
  }),
}

export default ListItem
