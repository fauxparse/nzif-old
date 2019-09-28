import React, { useMemo } from 'react'
import PropTypes from 'lib/proptypes'
import pluralize from 'pluralize'
import humanize from 'lib/humanize'
import Time from 'atoms/time'

const Day = ({ date, sessions }) => {
  const startTime = useMemo(() => date.clone().hour(9), [date])

  const groups = useMemo(() => (
    sessions.map(group => ({
      ...group[0],
      type: group[0].activity.type,
      activities: group.map(s => s.activity),
      startRow: group[0].startsAt.diff(startTime, 'minutes') / 15 + 1,
      endRow: group[0].endsAt.diff(startTime, 'minutes') / 15 + 1,
    }))
  ), [sessions, startTime])

  return (
    <div className="calendar__day">
      {groups.map(group => (
        <div
          key={group.id}
          className="calendar__group"
          style={{
            gridRowStart: group.startRow,
            gridRowEnd: group.endRow,
          }}
        >
          <div className="calendar__session" data-type={group.type}>
            <span className="session__name">
              {group.activities.length > 1 ? pluralize(humanize(group.type)) : group.activity.name}
            </span>
            {' '}
            <span className="session__times">
              <Time time={[group.startsAt, group.endsAt]} />
            </span>
          </div>
        </div>
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
