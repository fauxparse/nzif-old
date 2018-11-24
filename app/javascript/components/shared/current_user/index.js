import React, { Fragment } from 'react'
import { graphql } from 'react-apollo'
import { CURRENT_USER_QUERY } from '../../../queries'
import UserMenu from './user_menu'
import LogIn from './log_in'

const User = ({ data, loading, ...props }) => {
  if (loading) {
    return <Fragment />
  } else if (data && data.currentUser) {
    const { currentUser } = data
    return <UserMenu user={currentUser} {...props} />
  } else {
    return <LogIn {...props} />
  }
}

export default graphql(CURRENT_USER_QUERY)(User)
