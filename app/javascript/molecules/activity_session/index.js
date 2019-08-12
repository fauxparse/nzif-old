import React from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import Date from 'atoms/date'
import Time from 'atoms/time'

import './index.scss'

const ActivitySession = ({ className, startsAt, endsAt }) => (
  <div className={classNames('activity-session', className)}>
    <span className="activity-session__date"><Date date={startsAt} /></span>
    <span className="activity-session__time"><Time time={[startsAt, endsAt]} /></span>
  </div>
)

ActivitySession.propTypes = {
  startsAt: PropTypes.time.isRequired,
  endsAt: PropTypes.time.isRequired,
}

export default ActivitySession
