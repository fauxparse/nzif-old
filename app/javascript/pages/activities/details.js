import React, { useMemo } from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import { useQuery } from 'react-apollo-hooks'
import Template from 'templates/activities/details'
import ACTIVITY_QUERY from 'queries/activity'

const Details = ({ match }) => {
  const { year, slug } = match.params

  const type = match.params.type.replace(/s$/, '')

  const { loading, data } = useQuery(ACTIVITY_QUERY, { variables: { year, type, slug } })

  const activity = useMemo(() => (!loading && data && data.activity) || undefined, [loading, data])

  return (
    <Template
      type={type}
      festival={{ year }}
      loading={loading}
      activity={activity}
    />
  )
}

Details.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
}

export default Details
