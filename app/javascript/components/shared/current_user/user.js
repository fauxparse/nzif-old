import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import CommonProps from '../../../lib/common_props'
import Menu from '../menu'
import Button from '../../../atoms/button'
import Avatar from './avatar'

const User = forwardRef(({ user, notificationsCount, ...props }, ref) => (
  <Menu.Button ref={ref} className="current-user__button" {...props}>
    <Avatar user={user} notificationsCount={notificationsCount} />
    <Button.Text className="current-user__name">{user.name}</Button.Text>
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
