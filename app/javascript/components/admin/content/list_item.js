import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import MomentPropTypes from 'react-moment-proptypes'
import Icon from 'atoms/icon'
import moment from 'lib/moment'
import Link from '../../shared/ripple/link'

const ListItem = ({ baseUrl, content, now }) => {
  const displayTime = useMemo(() => {
    const updated = moment(content.updatedAt)
    if (now.diff(updated, 'days') > 7) {
      return updated.format('D MMMM YYYY')
    } else {
      return updated.from(now)
    }
  }, [content, now])

  return (
    <li className="list__item">
      <Link
        to={`${baseUrl}/${content.slug}`}
        className="list__link"
        activeClassName="list__link--active"
      >
        <Icon name="text" className="list__icon" />
        <span className="list__details">
          <span className="list__title">
            {content.title}
          </span>
          <span className="list__subtitle">
            {displayTime}
          </span>
        </span>
      </Link>
    </li>
  )
}

ListItem.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  content: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }),
  now: MomentPropTypes.momentObj.isRequired,
}

export default ListItem
