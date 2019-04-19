import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import Skeleton from '../shared/skeleton_text'
import Activities from './list'

const TimeSlot = ({ activities, loading }) => {
  const time = useMemo(() => (
    activities[0].sessions[0].startsAt.hour() < 12 ? 'Morning' : 'Afternoon'
  ), activities)

  return (
    <div className="activities__time-slot">
      <Skeleton as="h3" className="activities__time" loading={loading}>
        {time}
      </Skeleton>
      <Activities activities={activities} loading={loading} />
    </div>
  )
}

TimeSlot.propTypes = {
  activities: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default TimeSlot
