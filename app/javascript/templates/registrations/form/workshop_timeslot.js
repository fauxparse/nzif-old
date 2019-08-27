import React, { useMemo } from 'react'
import PropTypes from 'lib/proptypes'
import Timeslot from 'molecules/timeslot'
import { useCurrentUser } from 'contexts/current_user'
import Workshop from './workshop'

const WorkshopTimeslot = ({
  time,
  loading,
  sessions,
  offset,
  ordering,
  onToggleActivity,
  onSelectActivity,
}) => {
  const user = useCurrentUser()

  const teachingThisSlot = useMemo(() => (
    !loading &&
      user &&
      sessions &&
      sessions.some(session => session.activity.presenters.some(p => p.id === user.id))
  ), [user, loading, sessions])

  return (
    <Timeslot time={time} offset={offset} loading={loading}>
      {sessions.map(session => (
        <Workshop
          key={session.id}
          session={session}
          loading={loading}
          disabled={teachingThisSlot}
          position={(ordering[session.startsAt.valueOf()] || []).indexOf(session) + 1}
          onToggle={onToggleActivity}
          onSelect={onSelectActivity}
        />
      ))}
    </Timeslot>
  )
}

WorkshopTimeslot.propTypes = {
  time: PropTypes.time.isRequired,
  loading: PropTypes.bool,
  sessions: PropTypes.arrayOf(PropTypes.session.isRequired).isRequired,
  offset: PropTypes.number,
  ordering:
    PropTypes.objectOf(PropTypes.arrayOf(PropTypes.session.isRequired).isRequired).isRequired,
  onToggleActivity: PropTypes.func.isRequired,
  onSelectActivity: PropTypes.func.isRequired,
}

export default WorkshopTimeslot
