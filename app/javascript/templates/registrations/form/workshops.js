import React, { useLayoutEffect, useMemo, useRef, useState } from 'react'
import moment from 'lib/moment'
import sortBy from 'lodash/sortBy'
import Timeslot from 'molecules/timeslot'
import dummy from 'templates/activities/overview/dummy'
import Heading from './heading'
import Day from './workshop_day'

const Workshops = () => {
  const container = useRef()

  const [offset, setOffset] = useState(0)

  const activitiesByDay = useMemo(() => dummy().map(day => ({
    date: moment(day.date),
    activities: sortBy(day.activities, [a => a.startsAt.valueOf, a => a.name]),
  })), [])

  useLayoutEffect(() => {
    const header =
      container.current.closest('.registration-form').querySelector('.registration-form__header')
    setOffset(header.offsetHeight)
  }, [container, setOffset])

  return (
    <section ref={container} className="registration-form__section registration-form__workshops">
      <Heading>Workshops</Heading>
      {activitiesByDay.map(({ date, activities }) => (
        <Day key={date.toISOString()} date={date} activities={activities} offset={offset} />
      ))}
    </section>
  )
}

export default Workshops
