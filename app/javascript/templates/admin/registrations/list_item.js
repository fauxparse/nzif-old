import React from 'react'
import PropTypes from 'lib/proptypes'
import moment from 'lib/moment'
import humanize from 'lib/humanize'
import List from 'molecules/list'
import Skeleton from 'effects/skeleton'
import Ripple from 'effects/ripple'
import { Link } from 'react-router-dom'

const SkeletonLink = ({ children, ...props }) => (
  <Skeleton as={Link} {...props}>{children}</Skeleton>
)

const registrationStatus = (state, completedAt) => {
  if (state === 'complete' && completedAt) {
    const date = moment(completedAt)
    return `Registered on ${date.format('D MMMM YYYY')}`
  } else {
    return humanize(state)
  }
}

const ListItem = ({ loading, url, user, state, completedAt }) => (
  <List.Item
    as={SkeletonLink}
    to={url}
    primary={user.name}
    secondary={registrationStatus(state, completedAt)}
    avatar={user}
    loading={loading}
  >
    <Ripple />
  </List.Item>
)

ListItem.propTypes = {
  loading: PropTypes.bool.isRequired,
  url: PropTypes.location.isRequired,
  user: PropTypes.user.isRequired,
  state: PropTypes.string.isRequired,
  completedAt: PropTypes.time,
}

ListItem.defaultProps = {
  completedAt: null,
}

export default ListItem
