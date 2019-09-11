import React, { useMemo } from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import { Droppable } from 'react-beautiful-dnd'
import Time from 'atoms/time'
import Participant from './participant'

import './index.scss'

/* eslint-disable react/prop-types */
const InnerList = React.memo(({ allocations, registrationsById, session, sessions }) => (
  allocations.map((allocation, index) => (
    <Participant
      key={allocation.registrationId}
      registration={registrationsById[allocation.registrationId]}
      locked={!!allocation.locked}
      position={index + 1}
      session={session}
      sessions={sessions}
      overCapacity={session && index >= session.capacity}
    />
  ))
))

InnerList.displayName = 'Timeslot.InnerList'
/* eslint-enable react/prop-types */

const Timeslot = ({ time, sessions, allocations, registrationsById, dragging }) => {
  const validSessions = useMemo(() => {
    const valid = dragging
      ? sessions.filter(s => dragging.preferences.some(p => p.sessionId === s.id))
      : sessions
    return valid.reduce((h, s) => ({ ...h, [s.id]: true }), {})
  }, [sessions, dragging])

  return (
    <section className="allocation__timeslot">
      <h2 className="allocation__time">
        <Time time={time} format="h:mm A, dddd D MMMM" />
      </h2>
      <div className="allocation__sessions">
        {sessions.map(session => (
          <Droppable
            key={session.id}
            droppableId={`${time.valueOf()}+${session.id}`}
            type={time.valueOf()}
            isDropDisabled={!validSessions[session.id]}
          >
            {provided => (
              <div
                className={classNames(
                  'allocation__session',
                  !validSessions[session.id] && 'allocation__session--disabled',
                )}
                key={session.id}
              >
                <h3 className="allocation__session-name">
                  {session.activity.name}
                </h3>
                <div
                  ref={provided.innerRef}
                  className="allocation__places"
                  {...provided.droppableProps}
                >
                  <InnerList
                    allocations={allocations[session.id]}
                    registrationsById={registrationsById}
                    session={session}
                    sessions={sessions}
                  />
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
        <Droppable
          droppableId={`${time.valueOf()}`}
          type={time.valueOf()}
        >
          {provided => (
            <div className="allocation__session allocation__session--unsuccessful">
              <h3 className="allocation__session-name">Unallocated</h3>
              <div
                ref={provided.innerRef}
                className="allocation__places"
                {...provided.droppableProps}
              >
                <InnerList
                  allocations={allocations.unallocated}
                  registrationsById={registrationsById}
                  session={null}
                  sessions={sessions}
                />
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </div>
    </section>
  )
}

Timeslot.propTypes = {
  time: PropTypes.time.isRequired,
  sessions: PropTypes.arrayOf(PropTypes.session.isRequired).isRequired,
  registrationsById: PropTypes.objectOf(PropTypes.registration.isRequired).isRequired,
  allocations: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.allocation.isRequired).isRequired,
      PropTypes.objectOf(PropTypes.arrayOf(PropTypes.allocation.isRequired).isRequired).isRequired,
    ])
  ).isRequired,
  dragging: PropTypes.registration,
}

Timeslot.defaultProps = {
  dragging: null,
}

export default Timeslot
