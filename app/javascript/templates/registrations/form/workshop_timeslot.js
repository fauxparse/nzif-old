import React, { useMemo } from 'react'
import PropTypes from 'lib/proptypes'
import moment from 'lib/moment'
import Timeslot from 'molecules/timeslot'
import { useCurrentUser } from 'contexts/current_user'
import { useRegistration } from 'contexts/registration'
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

  const { earlybird, registration } = useRegistration()

  const { workshops, waitlists } = registration

  const teachingThisSlot = useMemo(() => (
    !loading &&
      user &&
      sessions &&
      sessions.some(session => session.activity.presenters.some(p => p.id === user.id))
  ), [user, loading, sessions])

  const past = time.isBefore(moment())

  return (
    <Timeslot time={time} offset={offset} loading={loading}>
      {sessions.map(session => (
        <Workshop
          key={session.id}
          session={session}
          loading={loading}
          disabled={teachingThisSlot || past}
          position={earlybird ? (
            (ordering[session.startsAt.valueOf()] || []).indexOf(session.id) + 1
          ) : (
            undefined
          )}
          selected={earlybird ? undefined : workshops.includes(session.id)}
          wasSelected={(registration.originalWorkshops || []).includes(session.id)}
          waitlisted={earlybird ? undefined : waitlists.includes(session.id)}
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
    PropTypes.objectOf(PropTypes.arrayOf(PropTypes.id.isRequired).isRequired).isRequired,
  onToggleActivity: PropTypes.func.isRequired,
  onSelectActivity: PropTypes.func.isRequired,
}

export default WorkshopTimeslot
