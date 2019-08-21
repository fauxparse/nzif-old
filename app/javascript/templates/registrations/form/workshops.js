import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { usePreferentialOrdering } from 'lib/hooks'
import PropTypes from 'lib/proptypes'
import moment from 'lib/moment'
import last from 'lodash/last'
import sortBy from 'lodash/sortBy'
import keyBy from 'lodash/keyBy'
import groupBy from 'lodash/groupBy'
import entries from 'lodash/entries'
import dummy from 'templates/activities/overview/dummy'
import RegistrationContext from 'contexts/registration'
import Heading from './heading'
import Day from './workshop_day'

const Workshops = ({ onChange }) => {
  const {
    loading,
    workshops,
    registration: { preferences },
    change,
  } = useContext(RegistrationContext)

  const container = useRef()

  const [offset, setOffset] = useState(0)

  const activitiesByDay = useMemo(() => (loading ? dummy() : workshops).map(day => ({
    date: moment(day.date),
    activities: sortBy(day.activities, [a => a.startsAt.valueOf, a => a.name]),
  })), [loading, workshops])

  const workshopsById = useMemo(() => (
    keyBy(
      activitiesByDay.reduce((list, { activities }) => [...list, ...activities], []),
      a => a.id
    )
  ), [activitiesByDay])

  const [ordering, toggle, reset] = usePreferentialOrdering()

  const loaded = useRef(false)

  useEffect(() => {
    if (!loading && !loaded.current) {
      reset(
        groupBy(
          sortBy(preferences, [last]).map(([id]) => workshopsById[id]),
          a => a.startsAt.valueOf()
        )
      )
      loaded.current = true
    }
  }, [loaded, loading, workshopsById, preferences, reset])

  useEffect(() => {
    if (!loading) {
      const workshops = entries(ordering).reduce((result, [_, list]) => (
        [...result, ...list.map((w, i) => [w.id, i + 1])]
      ), [])
      onChange({ attributes: { workshops } })

      change({ preferences: workshops })
    }
  }, [loading, ordering, onChange, change])

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
      {activitiesByDay.map(({ date, activities }) => (
        <Day
          key={date.toISOString()}
          loading={loading}
          date={date}
          activities={activities}
          offset={offset}
          ordering={ordering}
          onToggleActivity={toggle}
        />
      ))}
    </section>
  )
}

Workshops.propTypes = {
  onChange: PropTypes.func.isRequired,
}

export default Workshops
