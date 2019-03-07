import React from 'react'
import PropTypes from 'prop-types'
import CommonProps from '../../../lib/common_props'
import Menu from '../menu'
import Avatar from './avatar'

const User = React.forwardRef(({ user, notificationsCount, ...props }, ref) => (
  <Menu.Button className="current-user__button" ref={ref} {...props}>
    <Avatar user={user} notificationsCount={notificationsCount} />
    <span className="current-user__name">{user.name}</span>
  </Menu.Button>
))

User.displayName = 'User'

User.propTypes = {
  user: CommonProps.user,
  notificationsCount: PropTypes.number,
}

User.defaultProps = {
  notificationsCount: 0,
}

export default User
