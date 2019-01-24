import React from 'react'
import PropTypes from 'prop-types'
import { CurrentUserContext } from '../components/shared/current_user'

const can = (user, action, _object) => {
  if (action === 'update') {
    return user.roles.indexOf('admin') > -1
  }
  return false
}

export default can

export const WithPermission = ({ to: action = 'update', subject, children }) => (
  <CurrentUserContext.Consumer>
    {user => can(user, action, subject) && children}
  </CurrentUserContext.Consumer>
)

WithPermission.propTypes = {
  to: PropTypes.string.isRequired,
  subject: PropTypes.any,
}
