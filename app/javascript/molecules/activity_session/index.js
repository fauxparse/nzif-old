import React from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import Date from 'atoms/date'
import Time from 'atoms/time'

import './index.scss'

const ActivitySession = ({ className, startsAt, endsAt, venue }) => (
  <div className={classNames('activity-session', className)}>
    <span className="activity-session__date"><Date date={startsAt} /></span>
    <span className="activity-session__time"><Time time={[startsAt, endsAt]} /></span>
    {venue && (
      <span className="activity-session__venue">{venue.name}</span>
    )}
  </div>
)

ActivitySession.propTypes = {
  startsAt: PropTypes.time.isRequired,
  endsAt: PropTypes.time.isRequired,
  venue: PropTypes.venue,
}

ActivitySession.defaultProps = {
  venue: null,
}

export default ActivitySession
