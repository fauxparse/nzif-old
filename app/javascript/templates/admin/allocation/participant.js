import React, { useMemo } from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import { useToggle } from 'lib/hooks'
import Badge from 'atoms/badge'
import Button from 'atoms/button'

const Participant = ({ registration, session }) => {
  const [expanded, toggle] = useToggle()
  const position = useMemo(() => {
    if (!session) return null
    const preference = registration.preferences.find(p => p.sessionId === session.id)
    return preference.position
  }, [registration, session])

  return (
    <div className={classNames('participant', expanded && 'participant--expanded')}>
      <div className="participant__summary">
        <Badge className="participant__position">{position}</Badge>
        <div className="participant__name">{registration.user.name}</div>
        <Button
          className="participant__toggle"
          icon="chevron-down"
          aria-label={expanded ? 'Hide details' : 'Show details'}
          onClick={toggle}
        />
      </div>
      {expanded && (
        <p>(details)</p>
      )}
    </div>
  )
}

Participant.propTypes = {
  registration: PropTypes.registration.isRequired,
  session: PropTypes.session,
}

export default Participant
