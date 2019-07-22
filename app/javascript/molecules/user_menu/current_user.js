import React, { forwardRef } from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import Menu from 'molecules/menu'
import Avatar from 'atoms/avatar'

const CurrentUser = forwardRef(({ className, user, children, ...props }, ref) => (
  <Menu.Button
    ref={ref}
    className={classNames('user-menu__current-user', className)}
    text={user.name}
    {...props}
  >
    <Avatar className="user-menu__avatar" {...user} />
    {children}
  </Menu.Button>
))

CurrentUser.propTypes = {
  user: PropTypes.user,
}

CurrentUser.defaultProps = {
  user: undefined,
}

CurrentUser.displayName = 'UserMenu.CurrentUser'

export default CurrentUser
