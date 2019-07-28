import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import { useApolloClient, useMutation } from 'react-apollo-hooks'
import CURRENT_USER_QUERY from 'queries/current_user'
import LOG_OUT_MUTATION from 'queries/mutations/log_out'
import Loader from 'atoms/loader'

const LogOut = ({ history }) => {
  const [loggingOut, setLoggingOut] = useState(false)

  const client = useApolloClient()

  const logOut = useMutation(LOG_OUT_MUTATION, {
    optimisticResponse: { logOut: null },
    update: proxy =>
      proxy.writeQuery({
        query: CURRENT_USER_QUERY,
        data: { currentUser: null }
      }),
  })

  const success = useCallback(() => {
    client.resetStore()
    setTimeout(() => history.push('/'), 50)
  }, [client, history])

  const canLogOut = useMemo(() => client && !loggingOut, [client, loggingOut])

  useEffect(() => {
    if (canLogOut) {
      setLoggingOut(true)
      logOut().then(success)
    }
  }, [canLogOut, logOut, success])

  return (
    <Loader />
  )
}

LogOut.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
}

export default LogOut
