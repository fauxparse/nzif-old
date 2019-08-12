import React, { useMemo } from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import { useQuery } from 'react-apollo-hooks'
import Template from 'templates/activities/overview'
import ACTIVITIES_QUERY from 'queries/activities_by_day'

const Overview = ({ match }) => {
  const { year } = match.params

  const type = match.params.type.replace(/s$/, '')

  const { loading, data } = useQuery(ACTIVITIES_QUERY, { variables: { year, type } })

  const activities = useMemo(() => {
    if (!data.festival) return []
    return data.festival.days
  }, [data])

  return (
    <Template
      type={type}
      festival={{ year }}
      loading={loading}
      activities={activities}
    />
  )
}

Overview.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
}

export default Overview
