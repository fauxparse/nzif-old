import React, { useCallback, useMemo } from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import { useQuery, useMutation } from 'react-apollo'
import groupBy from 'lodash/groupBy'
import sortBy from 'lodash/sortBy'
import values from 'lodash/values'
import moment from 'lib/moment'
import { useFestival } from 'contexts/festival'
import Template from 'templates/calendar'
import CALENDAR, { UPDATE_EXCLUSIONS } from 'queries/calendar'

const Calendar = ({ match }) => {
  const { year } = match.params

  const festival = useFestival() || { year }

  const { loading, data } = useQuery(CALENDAR, { variables: { year } })

  const excluded = useMemo(() => data.registration ? data.registration.excluded : [], [data])

  const sessions = useMemo(() => {
    if (loading || !data.sessions) return []

    const selected = data.registration.state === 'complete'
      ? data.registration.workshops
      : []

    const presenting = data.presenting.map(s => s.id)
      
    return values(
      groupBy(
        sortBy(
          data.sessions.map(s => ({
            ...s,
            startsAt: moment(s.startsAt),
            endsAt: moment(s.endsAt),
            selected:
              s.activity.type !== 'workshop' ||
              selected.includes(s.id) ||
              presenting.includes(s.id),
            excluded: excluded.includes(s.id),
          })),
          [s => s.startsAt.valueOf()]
        ),
        s => `${s.activity.type}|${s.startsAt.valueOf()}|${s.endsAt.valueOf()}`
      )
    )
  }, [loading, data, excluded])

  const registration = useMemo(() => {
    if (data && data.registration && data.registration.id) {
      return data.registration
    }
  }, [data])

  const [updateExclusions] = useMutation(UPDATE_EXCLUSIONS, {
    update: (cache, { data: { updateCalendarExclusions } }) => {
      const existing = cache.readQuery({ query: CALENDAR, variables: { year } })
      cache.writeQuery({
        query: CALENDAR,
        variables: { year },
        data: {
          ...existing,
          registration: {
            ...existing.registration,
            excluded: updateCalendarExclusions,
          },
        },
      })
    }
  })

  const sessionChanged = useCallback((sessionId, attributes) => {
    if (attributes.hasOwnProperty('excluded')) {
      const excluded = data.registration.excluded.filter(id => id !== sessionId)
      if (attributes.excluded) excluded.push(sessionId)
      updateExclusions({
        variables: { registrationId: data.registration.id, ids: excluded },
        optimisticResponse: { updateCalendarExclusions: excluded },
      })
    }
  }, [data, updateExclusions])

  return (
    <Template
      loading={loading || !festival.startDate}
      festival={festival}
      sessions={sessions}
      registration={registration}
      onChange={sessionChanged}
    />
  )
}

Calendar.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
}

export default Calendar
