import React, { useEffect, useState } from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import { withRouter } from 'react-router-dom'
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

  useEffect(() => {
    if (client && !loggingOut) {
      setLoggingOut(true)
      logOut().then(() => {
        client.resetStore()
        setTimeout(() => history.push('/'), 50)
      })
    }
  }, [loggingOut, logOut, client, history])

  return (
    <Loader />
  )
}

LogOut.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
}

export default withRouter(LogOut)
