import React, { useMemo } from 'react'
import PropTypes from 'lib/proptypes'
import Session from './session'

const Day = ({ date, sessions }) => {
  const startTime = useMemo(() => date.clone().hour(9), [date])

  const groups = useMemo(() => (
    sessions.map(group => ({
      ...group[0],
      type: group[0].activity.type,
      activities: group.map(s => ({ ...s.activity, selected: s.selected })),
      startRow: group[0].startsAt.diff(startTime, 'minutes') / 15 + 1,
      endRow: group[0].endsAt.diff(startTime, 'minutes') / 15 + 1,
    }))
  ), [sessions, startTime])

  return (
    <div className="calendar__day">
      {groups.map(group => (
        <Session key={group.id} group={group} />
      ))}
    </div>
  )
}

Day.propTypes = {
  date: PropTypes.time.isRequired,
  sessions:
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.session.isRequired).isRequired).isRequired,
}

export default Day
