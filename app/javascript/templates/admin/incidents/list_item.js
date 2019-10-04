import React from 'react'
import PropTypes from 'lib/proptypes'
import moment from 'lib/moment'
import List from 'molecules/list'
import Skeleton from 'effects/skeleton'
import Ripple from 'effects/ripple'
import { Link } from 'react-router-dom'

const SkeletonLink = ({ children, ...props }) => (
  <Skeleton as={Link} {...props}>{children}</Skeleton>
)

const ListItem = ({ loading, url, user, state, createdAt }) => (
  <List.Item
    as={SkeletonLink}
    to={url}
    icon={state === 'closed' ? 'check' : 'alert'}
    primary={user ? user.name : 'Anonymous'}
    secondary={moment(createdAt).format('h:mm A, dddd D MMMM')}
    loading={loading}
  >
    <Ripple />
  </List.Item>
)

ListItem.propTypes = {
  loading: PropTypes.bool.isRequired,
  url: PropTypes.location.isRequired,
  user: PropTypes.shape({ name: PropTypes.string.isRequired }),
  state: PropTypes.string.isRequired,
  createdAt: PropTypes.time,
}

ListItem.defaultProps = {
  user: null,
  createdAt: null,
}

export default ListItem
