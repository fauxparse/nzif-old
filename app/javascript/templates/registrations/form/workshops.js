import React, { useEffect, useLayoutEffect, useMemo, useRef, useReducer, useState } from 'react'
import PropTypes from 'lib/proptypes'
import moment from 'lib/moment'
import sortBy from 'lodash/sortBy'
import entries from 'lodash/entries'
import isEmpty from 'lodash/isEmpty'
import dummy from 'templates/activities/overview/dummy'
import Heading from './heading'
import Day from './workshop_day'

const usePreferentialOrdering = (initialOrder = {}) => useReducer((ordering, item) => {
  const key = item.startsAt.valueOf()
  const order = ordering[key] || []
  return {
    ...ordering,
    [key]: order.includes(item) ? order.filter(i => i !== item) : [...order, item],
  }
}, initialOrder)

const Workshops = ({ onChange }) => {
  const container = useRef()

  const [offset, setOffset] = useState(0)

  const activitiesByDay = useMemo(() => dummy().map(day => ({
    date: moment(day.date),
    activities: sortBy(day.activities, [a => a.startsAt.valueOf, a => a.name]),
  })), [])

  const [ordering, toggle] = usePreferentialOrdering()

  const workshopCount = useMemo(() => (
    entries(ordering).filter(([_, choices]) => !isEmpty(choices)).length
  ), [ordering])

  useEffect(() => {
    const workshops = entries(ordering).reduce((result, [_, list]) => (
      [...result, ...list.map((w, i) => [w.id, i + 1])]
    ), [])
    onChange({ attributes: { workshops } })
  }, [ordering])

  useLayoutEffect(() => {
    const header =
      container.current.closest('.registration-form').querySelector('.registration-form__header')
    setOffset(header.offsetHeight)
  }, [container, setOffset])

  return (
    <section ref={container} className="registration-form__section registration-form__workshops">
      <Heading>Workshops</Heading>
      <p>
        Select as many workshops as you’re interested in, in order of preference.
        Once earlybird registrations are closed, we’ll allocate the available places based
        on your preferences. If some workshops are popular you might not get all your first choices,
        so be sure to give backup options to get the most out of your NZIF experience.
      </p>
      <p>{workshopCount} {workshopCount === 1 ? 'workshop' : 'workshops'} selected</p>
      {activitiesByDay.map(({ date, activities }) => (
        <Day
          key={date.toISOString()}
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
