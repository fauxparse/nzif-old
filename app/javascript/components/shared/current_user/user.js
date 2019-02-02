import React from 'react'
import Menu from '../menu'
import Avatar from './avatar'

const User = React.forwardRef(({ user, notificationsCount, ...props }, ref) => (
  <Menu.Button className="current-user__button" ref={ref} {...props}>
    <Avatar user={user} notificationsCount={notificationsCount} />
    <span className="current-user__name">{user.name}</span>
  </Menu.Button>
))

export default User
