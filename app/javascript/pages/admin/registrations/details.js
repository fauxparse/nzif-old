import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import { useQuery, useMutation } from 'react-apollo'
import faker from 'faker'
import isEqual from 'lodash/isEqual'
import pick from 'lodash/pick'
import moment from 'lib/moment'
import Template from 'templates/admin/registrations/details'
import REGISTRATION from 'queries/registration'
import UPDATE_REGISTRATION from 'queries/mutations/update_registration'
import UPDATE_PAYMENT from 'queries/mutations/update_payment'
import ADD_PAYMENT from 'queries/mutations/add_payment'

const Details = ({ match }) => {
  const { year, id } = match.params

  const { loading, data } = useQuery(REGISTRATION, { variables: { year, id } })

  const [updateRegistration] = useMutation(UPDATE_REGISTRATION, {
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

  const [updatePayment] = useMutation(UPDATE_PAYMENT, {
    update: (cache, { data: { updatePayment } }) => {
      const variables = { year, id }
      const existing = cache.readQuery({ query: REGISTRATION, variables })
      cache.writeQuery({
        query: REGISTRATION,
        variables,
        data: {
          ...existing,
          registration: {
            ...existing.registration,
            payments: existing.registration.payments.map(p => (p.id === updatePayment.id ? {
              ...p,
              ...updatePayment,
            } : p))
          },
        },
      })
    }
  })

  const paymentChanged = useCallback(({ id, ...payment }) => {
    const attributes = pick(payment, ['amount', 'state'])
    updatePayment({
      variables: { id, attributes },
    })
  }, [updatePayment])

  const [addPayment] = useMutation(ADD_PAYMENT, {
    update: (cache, { data: { addPayment } }) => {
      const variables = { year, id }
      const existing = cache.readQuery({ query: REGISTRATION, variables })
      cache.writeQuery({
        query: REGISTRATION,
        variables,
        data: {
          ...existing,
          registration: {
            ...existing.registration,
            payments: [...existing.registration.payments, addPayment],
          },
        },
      })
    }
  })

  const paymentAdded = useCallback((payment) => {
    const attributes = {
      ...pick(payment, ['amount', 'state', 'type', 'description']),
      registrationId: id,
    }

    addPayment({
      variables: { attributes },
    })
  }, [addPayment, id])

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
      festival={loading ? { year } : data.festival}
      registration={registration}
      sessions={sessions}
      allInShows={allIn}
      onChange={saveChanges}
      onPaymentAdded={paymentAdded}
      onPaymentChanged={paymentChanged}
    />
  )
}

Details.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
}

export default Details
