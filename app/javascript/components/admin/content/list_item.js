import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import MomentPropTypes from 'react-moment-proptypes'
import List from 'molecules/list'
import moment from 'lib/moment'

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
    <List.Link
      to={`${baseUrl}/${content.slug}`}
      icon="text"
      primary={content.title}
      secondary={displayTime}
    />
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
