import React from 'react'
import { graphql } from 'react-apollo'
import { CURRENT_USER_QUERY } from '../queries'

export { CURRENT_USER_QUERY }

export const withCurrentUser = WrappedComponent =>
  graphql(CURRENT_USER_QUERY)(({ data, children, ...props }) => {
    const { loading, error, currentUser } = data

    return (
      <WrappedComponent
        data={data}
        currentUser={(!loading && !error) ? currentUser : null}
        {...props}
      >
        {children}
      </WrappedComponent>
    )
  })

export default withCurrentUser
