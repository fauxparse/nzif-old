import React from 'react'
import PropTypes from 'lib/proptypes'
import List from 'molecules/list'
import Skeleton from 'effects/skeleton'
import Ripple from 'effects/ripple'
import { Link } from 'react-router-dom'

const SkeletonLink = ({ children, ...props }) => (
  <Skeleton as={Link} {...props}>{children}</Skeleton>
)

const ListItem = ({ loading, url, user }) => (
  <List.Item
    as={SkeletonLink}
    to={url}
    primary={user.name}
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
}

export default ListItem
