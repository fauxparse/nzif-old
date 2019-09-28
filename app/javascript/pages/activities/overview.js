import React, { useMemo } from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import { useQuery } from 'react-apollo-hooks'
import snakeCase from 'lodash/snakeCase'
import moment from 'lib/moment'
import Template from 'templates/activities/overview'
import SESSIONS from 'queries/sessions'

const Overview = ({ match }) => {
  const { year } = match.params

  const type = snakeCase(match.params.type).replace(/s$/, '')

  const { loading, data } = useQuery(SESSIONS, { variables: { year, type } })

  const sessions = useMemo(() => {
    if (!data.festival) return []
    return data.festival.sessions.map(session => ({
      ...session,
      startsAt: moment(session.startsAt),
      endsAt: moment(session.endsAt),
    }))
  }, [data])

  return (
    <Template
      type={type}
      festival={{ year }}
      loading={loading}
      sessions={sessions}
    />
  )
}

Overview.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
}

export default Overview
