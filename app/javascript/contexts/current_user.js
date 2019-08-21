import React, { createContext, useContext } from 'react'
import { graphql } from 'react-apollo'
import { CURRENT_USER_QUERY } from 'queries'

export const CurrentUserContext = createContext(undefined)

export const CurrentUserProvider = graphql(CURRENT_USER_QUERY)(({ data, children }) => {
  const { loading, error, currentUser } = data
  const user = !loading && !error ? currentUser : undefined

  return (
    <CurrentUserContext.Provider value={user}>
      {children}
    </CurrentUserContext.Provider>
  )
})

export const useCurrentUser = () => useContext(CurrentUserContext)

export default CurrentUserContext
