import React from 'react'
import { useQuery } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import { CURRENT_USER_QUERY } from 'queries'
import Loader from 'atoms/loader'

const Returning = ({ match }) => {
  const { loading, data } = useQuery(CURRENT_USER_QUERY)

  const { path } = match.params

  if (loading) return <Loader />

  if (data.currentUser) return <Redirect to={`/${path}`} />

  return <Redirect to={{ pathname: '/login', state: { returnTo: path } }} />
}

export default Returning
