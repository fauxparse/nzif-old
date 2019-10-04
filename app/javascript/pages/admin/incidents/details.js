import React, { useCallback } from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import { useQuery, useMutation } from 'react-apollo'
import { useFestival } from 'contexts/festival'
import Template from 'templates/admin/incidents/details'
import INCIDENT from 'queries/incident'
import INCIDENTS from 'queries/incidents'
import UPDATE_INCIDENT from 'queries/mutations/update_incident'

const Details = ({ match }) => {
  const { year, id } = match.params

  const festival = useFestival() || { adminRoot: `/admin/${year}` }

  const { loading, data } = useQuery(INCIDENT, { variables: { id } })

  const [updateIncident] = useMutation(UPDATE_INCIDENT, {
    update: (cache, { data: { updateIncident } }) => {
      const existing = cache.readQuery({ query: INCIDENT, variables: { id } })
      cache.writeQuery({
        query: INCIDENT,
        variables: { id },
        data: {
          incident: { ...existing.incident, ...updateIncident },
        },
      })
    },
    refetchQueries: () => [{ query: INCIDENTS, variables: { year } }],
  })

  const changed = useCallback((attributes) => {
    updateIncident({
      variables: { id, ...attributes },
      optimisticResponse: {
        updateIncident: {
          ...data.incident,
          ...attributes,
        },
      },
    })

  }, [data, id, updateIncident])

  return (
    <Template
      incident={loading ? null : data.incident}
      festival={festival}
      onChange={changed}
    />
  )
}

Details.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
}

export default Details