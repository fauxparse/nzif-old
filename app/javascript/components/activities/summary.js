import React from 'react'
import PropTypes from 'prop-types'
import Detail from '../shared/detail'
import Level from 'atoms/level'
import Date from 'atoms/date'
import Time from 'atoms/time'

const ActivitySummary = ({ activity }) => (
  <aside className="activity-summary">
    {activity.levels && activity.levels.length ? (
      <Detail className="activity-levels activity-summary__levels" icon="levels">
        {activity.levels.map(level => <Level level={level} key={level} />)}
      </Detail>
    ) : null}
    {activity.sessions &&
      activity.sessions.length && (
        <Detail className="activity-sessions activity-summary__sessions" icon="calendar">
          {activity.sessions.map(session => (
            <div key={session.startsAt} className="activity-session activity-summary__session">
              <span className="activity-session__date">
                <Date date={session.startsAt} />
              </span>
              <span className="activity-session__time">
                <Time time={[session.startsAt, session.endsAt]} />
              </span>
            </div>
          ))}
        </Detail>
      )}
  </aside>
)

ActivitySummary.propTypes = {
  activity: PropTypes.shape({
    levels: PropTypes.arrayOf(PropTypes.string),
    sessions: PropTypes.arrayOf(PropTypes.session.isRequired),
  }).isRequired
}

export default ActivitySummary
