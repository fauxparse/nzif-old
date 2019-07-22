import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import MomentPropTypes from 'react-moment-proptypes'
import List from 'molecules/list'
import Ripple from 'effects/ripple'
import moment from 'lib/moment'
import Link from '../../shared/link'

const ContentItem = ({ baseUrl, content, now }) => {
  const displayTime = useMemo(() => {
    const updated = moment(content.updatedAt)
    if (now.diff(updated, 'days') > 7) {
      return updated.format('D MMMM YYYY')
    } else {
      return updated.from(now)
    }
  }, [content, now])

  return (
    <List.Item
      as={Link}
      to={`${baseUrl}/${content.slug}`}
      className="list-item__link"
      activeClassName="list-item__link--active"
      icon="text"
      primary={content.title}
      secondary={displayTime}
    >
      <Ripple />
    </List.Item>
  )
}

ContentItem.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  content: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }),
  now: MomentPropTypes.momentObj.isRequired,
}

export default ContentItem
