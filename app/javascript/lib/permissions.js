import React, { Fragment, useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import CurrentUserContext from 'contexts/current_user'

export const can = (user, action, object) => {
  const roles = new Set(user && user.roles || [])
  switch (action) {
    case 'update':
      return roles.has('admin') ||
        (object.__typename === 'User' && user && user.id === object.id)

    case 'editRoles':
      return roles.has('admin')

    default:
      return false
  }
}

export default can

export const usePermission = (action, object) => {
  const user = useContext(CurrentUserContext)
  return useMemo(() => can(user, action, object), [user, action, object])
}

export const WithPermission = ({ to: action = 'update', subject, children }) => {
  const hasPermission = usePermission(action, subject)

  if (hasPermission) {
    return <Fragment>{children}</Fragment>
  }

  return null
}

WithPermission.propTypes = {
  to: PropTypes.string.isRequired,
  subject: PropTypes.any,
}
