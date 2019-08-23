import React, { useMemo } from 'react'
import entries from 'lodash/entries'
import groupBy from 'lodash/groupBy'
import sortBy from 'lodash/sortBy'
import PropTypes from 'lib/proptypes'
import moment from 'lib/moment'
import Timeslot from 'molecules/timeslot'
import Template from 'molecules/day'
import Activity from './activity'

const Day = ({ date, sessions, loading }) => {
  const slots = useMemo(() => (
    sortBy(
      entries(groupBy(sessions, session => session.startsAt.valueOf())),
      [([time]) => time]
    ).map(([time, sessions]) => [moment(parseInt(time, 10)), sessions])
  ), [sessions])

  return (
    <Template date={date} loading={loading}>
      {slots.map(([time, activities]) => (
        <Timeslot key={time.valueOf()} loading={loading} time={time}>
          {activities.map(session => (
            <Activity key={session.id} loading={loading} {...session.activity} />
          ))}
        </Timeslot>
      ))}
    </Template>
  )
}

Day.propTypes = {
  date: PropTypes.time.isRequired,
  loading: PropTypes.bool,
  sessions: PropTypes.arrayOf(PropTypes.session.isRequired).isRequired,
}

Day.defaultProps = {
  loading: false,
}

export default Day
