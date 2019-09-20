import React, { useCallback, useMemo } from 'react'
import { useQuery, useMutation } from 'react-apollo'
import sortBy from 'lodash/sortBy'
import Template from 'templates/admin/venues'
import { useFestival } from 'contexts/festival'
import Loader from 'atoms/loader'
import VENUES from 'queries/venues'
import CREATE_VENUE from 'queries/mutations/create_venue'
import UPDATE_VENUE from 'queries/mutations/update_venue'
import DELETE_VENUE from 'queries/mutations/delete_venue'

const Venues = () => {
  const { loading, data } = useQuery(VENUES)

  const venues = useMemo(() => (data.venues && sortBy(data.venues, [v => v.name])) || [], [data])

  const festival = useFestival()

  const [createVenue] = useMutation(CREATE_VENUE, {
    update: (client, { data: { createVenue } }) => {
      const existing = client.readQuery({ query: VENUES })
      client.writeQuery({
        query: VENUES,
        data: {
          venues: [...existing.venues, createVenue],
        },
      })
    },
  })

  const [updateVenue] = useMutation(UPDATE_VENUE, {
    update: (client, { data: { updateVenue } }) => {
      const existing = client.readQuery({ query: VENUES })
      client.writeQuery({
        query: VENUES,
        data: {
          venues: existing.venues.map(v => (v.id === updateVenue.id ? {
            ...v,
            ...updateVenue,
          } : v)),
        },
      })
    },
  })

  const [deleteVenue] = useMutation(DELETE_VENUE)

  const create = useCallback((attributes) => (
    createVenue({ variables: { attributes } })
  ), [createVenue])

  const update = useCallback(({ id, ...attributes }) => (
    updateVenue({
      variables: { id, attributes },
      optimisticResponse: { updateVenue: { id, ...attributes } },
    })
  ), [updateVenue])

  const destroy = useCallback(({ id }) => {
    deleteVenue({
      variables: { id },
      optimisticResponse: { deleteVenue: true },
      update: (client) => {
        const existing = client.readQuery({ query: VENUES })
        client.writeQuery({
          query: VENUES,
          data: {
            venues: existing.venues.filter(v => v.id !== id),
          },
        })
      }
    })
  }, [deleteVenue])

  return festival ? (
    <Template
      loading={loading}
      festival={festival}
      venues={venues}
      onAddVenue={create}
      onUpdateVenue={update}
      onDeleteVenue={destroy}
    />
  ) : <Loader />
}

export default Venues