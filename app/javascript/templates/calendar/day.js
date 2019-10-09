import React, { useMemo } from 'react'
import PropTypes from 'lib/proptypes'
import Session from './session'

const Day = ({ date, sessions, onSessionClicked }) => {
  const startTime = useMemo(() => date.clone().hour(9), [date])

  const groups = useMemo(() => (
    sessions.map(group => ({
      ...group[0],
      type: group[0].activity.type,
      excluded: group.some(s => s.excluded),
      activities: group.map(s => ({ ...s.activity, selected: s.selected, venue: s.venue })),
      startRow: group[0].startsAt.diff(startTime, 'minutes') / 15 + 1,
      endRow: group[0].endsAt.diff(startTime, 'minutes') / 15 + 1,
    }))
  ), [sessions, startTime])

  return (
    <div className="calendar__day">
      {groups.map(group => (
        <Session
          key={group.id}
          group={group}
          excluded={group.excluded}
          onClick={onSessionClicked}
        />
      ))}
    </div>
  )
}

Day.propTypes = {
  date: PropTypes.time.isRequired,
  sessions:
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.session.isRequired).isRequired).isRequired,
  onSessionClicked: PropTypes.func.isRequired,
}

export default Day
