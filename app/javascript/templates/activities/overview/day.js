import React, { useMemo } from 'react'
import entries from 'lodash/entries'
import groupBy from 'lodash/groupBy'
import sortBy from 'lodash/sortBy'
import PropTypes from 'lib/proptypes'
import moment from 'lib/moment'
import Timeslot from 'molecules/timeslot'
import Template from 'molecules/day'
import Activity from './activity'

const Day = ({ date, activities, loading }) => {
  const slots = useMemo(() => (
    sortBy(
      entries(groupBy(activities, activity => activity.startsAt.valueOf())),
      [([time]) => time]
    ).map(([time, activities]) => [moment(parseInt(time, 10)), activities])
  ), [activities])

  return (
    <Template date={date} loading={loading}>
      {slots.map(([time, activities]) => (
        <Timeslot key={time.valueOf()} loading={loading} time={time}>
          {activities.map(activity => (
            <Activity key={activity.id} loading={loading} {...activity} />
          ))}
        </Timeslot>
      ))}
    </Template>
  )
}

Day.propTypes = {
  date: PropTypes.time.isRequired,
  loading: PropTypes.bool,
  activities: PropTypes.arrayOf(PropTypes.activity.isRequired).isRequired,
}

Day.defaultProps = {
  loading: false,
}

export default Day
