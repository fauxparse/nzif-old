import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import { useQuery, useMutation } from 'react-apollo'
import { NetworkStatus } from 'apollo-client'
import queryString from 'query-string'
import moment from 'lib/moment'
import entries from 'lodash/entries'
import isEmpty from 'lodash/isEmpty'
import { notify } from 'molecules/toast'
import Template, { useAllocations } from 'templates/admin/allocation'
import { useFestival } from 'contexts/festival'
import ALLOCATION from 'queries/allocation'
import FINALIZE_ALLOCATION from 'queries/mutations/finalize_allocation'

const Allocation = ({ location, history }) => {
  const festival = useFestival()

  const { year } = festival

  const initialSeed = useRef(queryString.parse(location.search).seed)

  const { loading: loadingData, data = {}, refetch, networkStatus } = useQuery(ALLOCATION, {
    variables: { year, seed: initialSeed.current },
  })

  const refetching = networkStatus === NetworkStatus.refetch

  const [allocations, move, reset] = useAllocations({})

  const shuffle = () => {
    reset({})
    refetch({ variables: { year } })
  }

  const loading = loadingData || refetching

  const sessions = useMemo(() => {
    if (loading) {
      return []
    } else {
      return data.sessions.map(session => ({
        ...session,
        startsAt: moment(session.startsAt),
        endsAt: moment(session.endsAt),
      }))
    }
  }, [data, loading])

  const registrations = useMemo(() => (
    loading ? [] : data.registrations
  ), [data, loading])

  const seed = useMemo(() => data.allocation && data.allocation.seed, [data])

  useEffect(() => {
    if (!loading) {
      const map = data.allocation.timeslots.reduce((result, slot) => {
        const time = moment(slot.startsAt).valueOf()
        const sessions = slot.sessions.reduce((h, session) => ({
          ...h,
          [session.sessionId]: session.registrationIds.map(id => ({
            registrationId: id,
            sessionId: session.sessionId
          }))
        }), {})
        return {
          ...result,
          [time]: {
            ...sessions,
            unallocated: slot.unallocated.map(id => ({ registrationId: id, sessionId: null }))
          }
        }
      }, {})
      reset(map)
    }
  }, [data, loading, reset])

  useEffect(() => {
    const currentSeed = queryString.parse(location.search).seed
    if (seed && seed !== currentSeed) {
      history.replace({ ...location, search: `?seed=${seed}` })
    }
  }, [seed, history, location])

  const finalized = data && data.allocation && data.allocation.finalized

  const [finalizing, setFinalizing] = useState(false)

  const [finalizeAllocation] = useMutation(FINALIZE_ALLOCATION)

  const finalize = useCallback(() => {
    setFinalizing(true)

    const lists = entries(allocations).reduce((result, [, { unallocated, ...sessions }]) => ([
      ...result,
      ...entries(sessions).map(([sessionId, allocations]) => ({
        sessionId,
        registrationIds: allocations.map(a => a.registrationId)
      })),
    ]), [])
    finalizeAllocation({ variables: { year, lists } })
      .then(() => {
        history.push(festival.adminRoot)
        notify('Workshop allocation finalized!')
      })
  }, [setFinalizing, allocations, finalizeAllocation, history, year, festival])

  return (
    <Template
      seed={seed}
      festival={festival}
      loading={loading || refetching || isEmpty(allocations)}
      finalizing={finalizing}
      finalized={finalized}
      allocations={allocations}
      sessions={sessions}
      registrations={registrations}
      onShuffle={shuffle}
      onMove={move}
      onFinalize={finalize}
    />
  )
}

Allocation.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
}

export default Allocation
