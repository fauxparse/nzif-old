import React, { useEffect, useMemo } from 'react'
import { useLazyQuery } from 'react-apollo'
import { useFestival } from 'contexts/festival'
import { useCurrentUser } from 'contexts/current_user'
import Template from 'templates/teaching'
import MY_WORKSHOPS from 'queries/my_workshops'

const Teaching = () => {
  const festival = useFestival()

  const user = useCurrentUser()

  const [fetchSessions, { loading, data }] = useLazyQuery(MY_WORKSHOPS)

  useEffect(() => {
    if (festival && user) {
      fetchSessions({ variables: { year: festival.year, presenterId: user.id } })
    }
  }, [festival, user, fetchSessions])

  const sessions = useMemo(() => (data ? data.sessions : []), [data])

  return (
    <Template
      loading={!festival || !user || loading}
      sessions={sessions}
    />
  )
}

export default Teaching