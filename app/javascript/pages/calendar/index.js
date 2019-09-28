import React, { useMemo } from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import { useQuery } from 'react-apollo'
import groupBy from 'lodash/groupBy'
import sortBy from 'lodash/sortBy'
import values from 'lodash/values'
import moment from 'lib/moment'
import { useFestival } from 'contexts/festival'
import Template from 'templates/calendar'
import CALENDAR from 'queries/calendar'

const Calendar = ({ match }) => {
  const { year } = match.params

  const festival = useFestival() || { year }

  const { loading, data } = useQuery(CALENDAR, { variables: { year } })

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
          })),
          [s => s.startsAt.valueOf()]
        ),
        s => `${s.activity.type}|${s.startsAt.valueOf()}|${s.endsAt.valueOf()}`
      )
    )
  }, [loading, data])

  return (
    <Template loading={loading || !festival.startDate} festival={festival} sessions={sessions} />
  )
}

Calendar.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
}

export default Calendar
