import React, { useMemo } from 'react'
import PropTypes from 'lib/proptypes'
import { Draggable } from 'react-beautiful-dnd'
import classNames from 'classnames'
import first from 'lodash/first'
import last from 'lodash/last'
import sortBy from 'lodash/sortBy'
import { useToggle } from 'lib/hooks'
import Badge from 'atoms/badge'
import Button from 'atoms/button'
import Icon from 'atoms/icon'

const Participant = ({ registration, session, sessions, locked, position, overCapacity }) => {
  const [expanded, toggle] = useToggle()

  const choice = useMemo(() => (
    session ? (
      registration.preferences.find(p => p.sessionId === session.id).position
    ) : null
  ), [registration, session])

  const order = useMemo(() => {
    const selected =
      sessions.map(s => [registration.preferences.findIndex(p => p.sessionId === s.id), s])
    return sortBy(selected.filter(([p]) => p > -1), [first]).map(last)
  }, [registration, sessions])

  const id = useMemo(() => (
    `${registration.id}+${sessions[0].startsAt.valueOf()}`
  ), [registration, sessions])

  return (
    <Draggable draggableId={id} index={position - 1} type={sessions[0].startsAt.valueOf()}>
      {(provided, { isDragging }) => (
        <div
          ref={provided.innerRef}
          className={classNames(
            'participant',
            expanded && 'participant--expanded',
            isDragging && 'participant--dragging',
            overCapacity && 'participant--over-capacity',
          )}
          data-choice={choice}
          {...provided.draggableProps}
        >
          <div className="participant__summary" {...provided.dragHandleProps}>
            <div className="participant__name">{registration.user.name}</div>
            <Button
              className="participant__toggle"
              icon="chevron-down"
              aria-label={expanded ? 'Hide details' : 'Show details'}
              onClick={toggle}
            />
          </div>
          <div className="participant__preferences">
            {order.map((session, i) => (
              <div key={session.id} className="participant__preference" data-position={i + 1}>
                <Badge>{locked ? <Icon name="lock" /> : (i + 1)}</Badge>
                <span className="participant__preferred">{session.activity.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Draggable>
  )
}

Participant.propTypes = {
  registration: PropTypes.registration.isRequired,
  session: PropTypes.session,
  sessions: PropTypes.arrayOf(PropTypes.session).isRequired,
  position: PropTypes.number.isRequired,
  locked: PropTypes.bool,
  overCapacity: PropTypes.bool,
}

Participant.defaultProps = {
  locked: false,
  overCapacity: false,
}

export default Participant
