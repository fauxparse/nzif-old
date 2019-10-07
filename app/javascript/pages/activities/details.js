import React, { useMemo } from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import { Redirect } from 'react-router-dom'
import { useQuery } from 'react-apollo-hooks'
import snakeCase from 'lodash/snakeCase'
import Template from 'templates/activities/details'
import NotFound from 'templates/not_found'
import ACTIVITY_QUERY from 'queries/activity'

const Details = ({ match }) => {
  const { year, slug } = match.params

  const type = snakeCase(match.params.type).replace(/s$/, '')

  const { loading, data, error } = useQuery(ACTIVITY_QUERY, { variables: { year, type, slug } })

  const activity = useMemo(() => (!loading && data && data.activity) || undefined, [loading, data])

  if (error) {
    const graphQLError = error.graphQLErrors[0]
    if (graphQLError.status === 'NOT_FOUND') {
      return <NotFound />
    } else {
      return <Redirect to="/" />
    }
  }

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
