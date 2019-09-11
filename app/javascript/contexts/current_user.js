import React, { createContext, useContext } from 'react'
import { useQuery } from 'react-apollo'
import { CURRENT_USER_QUERY } from 'queries'

export const CurrentUserContext = createContext(undefined)

export const CurrentUserLoadingContext = createContext(false)

export const CurrentUserProvider = ({ children }) => {
  const { loading, error, data: { currentUser } } = useQuery(CURRENT_USER_QUERY)

  const user = (!loading && !error) ? currentUser : undefined

  return (
    <CurrentUserLoadingContext.Provider value={loading}>
      <CurrentUserContext.Provider value={user}>
        {children}
      </CurrentUserContext.Provider>
    </CurrentUserLoadingContext.Provider>
  )
}

export const useCurrentUser = () => useContext(CurrentUserContext)

export default CurrentUserContext
