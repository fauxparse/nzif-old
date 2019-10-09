import React, { useCallback, useMemo } from 'react'
import entries from 'lodash/entries'
import groupBy from 'lodash/groupBy'
import sortBy from 'lodash/sortBy'
import PropTypes from 'lib/proptypes'
import moment from 'lib/moment'
import Timeslot from 'molecules/timeslot'
import Template from 'molecules/day'
import Activity from './activity'

const Day = ({ date, type, sessions, loading }) => {
  const group = useCallback((session) => (
    (type === 'workshop' ? session.startsAt : session.startsAt.clone().startOf('day')).valueOf()
  ), [type])

  const slots = useMemo(() => (
    sortBy(entries(groupBy(sessions, group), [([time]) => time]))
      .map(([time, s]) => [moment(parseInt(time, 10)), s])
  ), [sessions, group])

  return (
    <Template date={date} type={type} loading={loading}>
      {slots.map(([time, activities]) => (
        <Timeslot key={time.valueOf()} loading={loading} time={time}>
          {activities.map(session => (
            <Activity key={session.id} loading={loading} {...session} {...session.activity} />
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
  type: PropTypes.string,
}

Day.defaultProps = {
  loading: false,
  type: 'workshop',
}

export default Day
