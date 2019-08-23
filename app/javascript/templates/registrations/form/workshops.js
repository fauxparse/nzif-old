import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { usePreferentialOrdering } from 'lib/hooks'
import moment from 'lib/moment'
import sortBy from 'lodash/sortBy'
import keyBy from 'lodash/keyBy'
import groupBy from 'lodash/groupBy'
import entries from 'lodash/entries'
import dummy from 'templates/activities/overview/dummy'
import RegistrationContext from 'contexts/registration'
import Heading from './heading'
import Day from './workshop_day'

const Workshops = () => {
  const {
    loading,
    sessions,
    registration: { preferences },
    change,
  } = useContext(RegistrationContext)

  const container = useRef()

  const [offset, setOffset] = useState(0)

  const sessionsByDay = useMemo(() => (loading ? dummy() : sessions).map(day => ({
    date: moment(day.date),
    activities: sortBy(day.activities, [a => a.startsAt.valueOf, a => a.name]),
  })), [loading, sessions])

  const sessionsById = useMemo(() => (
    keyBy(
      sessionsByDay.reduce((list, { activities }) => [...list, ...activities], []),
      a => a.id
    )
  ), [sessionsByDay])

  const [ordering, toggle, reset] = usePreferentialOrdering()

  const loaded = useRef(false)

  useEffect(() => {
    if (!loading && !loaded.current) {
      reset(
        groupBy(
          sortBy(preferences, [p => p.position]).map((p) => sessionsById[p.sessionId]),
          a => a.startsAt.valueOf()
        )
      )
      loaded.current = true
    }
  }, [loaded, loading, sessionsById, preferences, reset])

  useEffect(() => {
    if (!loading && loaded.current && ordering) {
      const preferences = entries(ordering).reduce((result, [_, list]) => (
        [...result, ...list.map((w, i) => ({ sessionId: w.id, position: i + 1 }))]
      ), [])

      change({ preferences })
    }
  }, [loading, ordering, change])

  useLayoutEffect(() => {
    const header =
      container.current.closest('.registration-form').querySelector('.registration-form__header')
    setOffset(header.offsetHeight)
  }, [container, setOffset])

  return (
    <section ref={container} className="registration-form__section registration-form__workshops">
      <Heading>Select your workshops</Heading>
      <p>
        Select as many workshops as you’re interested in, in order of preference (per time slot).
        Once earlybird registrations are closed, we’ll allocate the available places based
        on your preferences. If some workshops are popular you might not get all your first choices,
        so be sure to give backup options to get the most out of your NZIF experience.
      </p>
      {sessionsByDay.map(({ date, activities }) => (
        <Day
          key={date.toISOString()}
          loading={loading}
          date={date}
          activities={activities}
          offset={offset}
          ordering={ordering || {}}
          onToggleActivity={toggle}
        />
      ))}
    </section>
  )
}

export default Workshops
