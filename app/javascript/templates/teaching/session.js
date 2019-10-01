import React, { useMemo } from 'react'
import PropTypes from 'lib/proptypes'
import { Link } from 'react-router-dom'
import deburr from 'lodash/deburr'
import sortBy from 'lodash/sortBy'
import moment from 'lib/moment'
import Button from 'atoms/button'
import Time from 'atoms/time'
import Chip from 'molecules/chip'

const Session = ({ session }) => {
  const startsAt = useMemo(() => moment(session.startsAt), [session])

  const endsAt = useMemo(() => moment(session.endsAt), [session])

  const participants = useMemo(() => (
    sortBy(session.placements.map(p => p.user), [u => deburr(u.name).toLowerCase()])
  ), [session])

  return (
    <div className="teaching__session">
      <div className="teaching__venue">
        <p>
          Your workshop is at {session.venue.name}, {session.venue.address}, from <Time time={[startsAt, endsAt]} />.</p>
        <Button as={Link} to="/map" icon="venue" text="Venue map" />
      </div>
      <div className="teaching__participants">
        <h2 className="teaching__heading">
          {participants.length}/{session.capacity} participants
        </h2>

        <div className="participant-list">
          {participants.map(user => (
            <Chip
              key={user.id}
              user={user}
              className="participant"
            />
          ))}
        </div>

        {session.waitlist.length > 0 && (
          <p>There are {session.waitlist.length} people on the waitlist for this session.</p>
        )}
      </div>
    </div>
  )
}

Session.propTypes = {
  session: PropTypes.session,
}

export default Session