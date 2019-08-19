import React, { useMemo } from 'react'
import PropTypes from 'lib/proptypes'
import moment from 'lib/moment'
import humanize from 'lib/humanize'
import entries from 'lodash/entries'
import groupBy from 'lodash/groupBy'
import sortBy from 'lodash/sortBy'
import Sentence from 'atoms/sentence'
import Badge from 'atoms/badge'
import Day from 'molecules/day'
import Timeslot from 'molecules/timeslot'
import Card from 'molecules/card'
import Workshop from './workshop'

const WorkshopDay = ({ date, loading, activities, offset, ordering, onToggleActivity }) => {
  const slots = useMemo(() => (
    sortBy(
      entries(groupBy(activities, activity => activity.startsAt.valueOf())),
      [([time]) => time]
    ).map(([time, activities]) => [moment(parseInt(time, 10)), activities])
  ), [activities])

  return (
    <Day date={date} offset={offset}>
      {slots.map(([time, activities]) => (
        <Timeslot key={time.valueOf()} time={time} offset={offset} loading={loading}>
          {activities.map(activity => (
            <Workshop
              key={activity.id}
              activity={activity}
              loading={loading}
              position={(ordering[activity.startsAt.valueOf()] || []).indexOf(activity) + 1}
              onToggle={onToggleActivity}
            />
          ))}
        </Timeslot>
      ))}
    </Day>
  )
}

WorkshopDay.propTypes = {
  date: PropTypes.time.isRequired,
  loading: PropTypes.bool,
  activities: PropTypes.arrayOf(PropTypes.activity.isRequired).isRequired,
  offset: PropTypes.number,
}

export default WorkshopDay
