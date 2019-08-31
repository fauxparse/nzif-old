import React, { useEffect, useMemo, useState } from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import { useQuery, useMutation } from 'react-apollo-hooks'
import faker from 'faker'
import isEqual from 'lodash/isEqual'
import moment from 'lib/moment'
import Template from 'templates/admin/registrations/details'
import REGISTRATION from 'queries/registration'
import UPDATE_REGISTRATION from 'queries/mutations/update_registration'

const Details = ({ match }) => {
  const { year, id } = match.params

  const { loading, data } = useQuery(REGISTRATION, { variables: { year, id } })

  const updateRegistration = useMutation(UPDATE_REGISTRATION, {
    update: (cache, { data: { updateRegistration } }) => {
      const variables = { year, id }
      const existing = cache.readQuery({ query: REGISTRATION, variables })
      cache.writeQuery({
        query: REGISTRATION,
        variables,
        data: {
          ...existing,
          registration: {
            ...existing.registration,
            ...updateRegistration,
          },
        },
      })
    },
  })

  const registration = useMemo(() => {
    if (loading || !data) {
      return {
        id: faker.random.uuid(),
        name: faker.name.findName(),
        user: {
          id: faker.random.uuid(),
        },
      }
    } else {
      return data.registration
    }
  }, [loading, data])

  const saveChanges = (attributes) => {
    const changed = { ...registration, ...attributes }
    if (!isEqual(registration, changed)) {
      updateRegistration({
        variables: { year, id, attributes },
        optimisticResponse: { updateRegistration: changed }
      })
    }
  }

  const [sessions, setSessions] = useState()

  const [allIn, setAllIn] = useState()

  useEffect(() => {
    if (!loading && data) {
      if (!sessions) {
        setSessions(data.festival.sessions.map(session => ({
          ...session,
          startsAt: moment(session.startsAt),
          endsAt: moment(session.endsAt),
        })))
      }
      if (!allIn) {
        setAllIn(data.festival.activities.reduce((list, show) => [
          ...list,
          ...show.sessions.map(session => ({
            ...session,
            startsAt: moment(session.startsAt),
            endsAt: moment(session.endsAt),
          })),
        ], []))
      }
    }
  }, [data, loading, sessions, setSessions, allIn, setAllIn])

  return (
    <Template
      loading={loading}
      festival={{ year }}
      registration={registration}
      sessions={sessions}
      allInShows={allIn}
      onChange={saveChanges}
    />
  )
}

Details.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
}

export default Details
