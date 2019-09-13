import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import PropTypes from 'lib/proptypes'
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
import WorkshopDetails from './workshop_details'

const Workshops = ({ festival }) => {
  const {
    loading,
    sessions,
    registration: { preferences },
    change,
  } = useContext(RegistrationContext)

  const earlybird = festival && festival.state === 'earlybird'

  const container = useRef()

  const [offset, setOffset] = useState(0)

  const [selected, setSelected] = useState()

  const deselect = useCallback(() => setSelected(null), [setSelected])

  const sessionsByDay = useMemo(() => (
    sortBy(
      entries(
        groupBy(
          sortBy((loading || !sessions) ? dummy() : sessions, [
            session => session.startsAt.valueOf(),
            session => session.activity.name.toLocaleLowerCase(),
          ]),
          session => moment(session.startsAt).format('YYYY-MM-DD'),
        )
      ).map(([date, sessions]) => [moment(date), sessions]),
      [([date]) => date.valueOf()],
    )
  ), [loading, sessions])

  const sessionsById = useMemo(() => (
    keyBy(
      sessionsByDay.reduce((list, [_, sessions]) => [...list, ...sessions], []),
      session => session.id
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
      {earlybird ? (
        <p>
          Select as many workshops as you’re interested in, in order of preference (per time slot).
          Once earlybird registrations are closed, we’ll allocate the available places based
          on your preferences. If some workshops are popular you might not get all your first
          choices, so be sure to give backup options to get the most out of your NZIF experience.
        </p>
      ) : (
        <p>
          Select your workshops from the list below, up to one per slot. Some workshops may be full
          already (sorry!) but you can join the waitlist in case a spot opens up.
        </p>
      )}
      {sessionsByDay.map(([date, sessions]) => (
        <Day
          key={date.toISOString()}
          loading={loading}
          date={date}
          sessions={sessions}
          offset={offset}
          ordering={ordering || {}}
          onToggleActivity={toggle}
          onSelectActivity={setSelected}
        />
      ))}
      <WorkshopDetails session={selected} onClose={deselect} />
    </section>
  )
}

Workshops.propTypes = {
  festival: PropTypes.festival,
}

export default Workshops
