import React, { useEffect, useMemo } from 'react'
import PropTypes from 'lib/proptypes'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import entries from 'lodash/entries'
import first from 'lodash/first'
import groupBy from 'lodash/groupBy'
import sortBy from 'lodash/sortBy'
import moment from 'lib/moment'
import Button from 'atoms/button'
import Time from 'atoms/time'
import List from 'molecules/list'

const Itinerary = ({ sessions, workshops, waitlists, onResendItinerary }) => {
  const days = useMemo(() => {
    const groups = entries(groupBy(sessions, session => moment(session.startsAt).valueOf()))
    const ids = [...workshops, ...waitlists]
    return sortBy(groups, [first]).map(([time, group]) => [
      moment(parseInt(time, 10)),
      sortBy(group.filter(s => ids.includes(s.id)), s => ids.indexOf(s.id))
    ]).filter(([, sessions]) => sessions.length)
  }, [workshops, waitlists, sessions])

  return (
    <div className="registration-details__itinerary">
      <Button
        primary
        icon="email"
        text="Resend email"
        onClick={onResendItinerary}
      />
      {days.map(([time, group]) => (
        <section key={time.valueOf()} className="itinerary__time">
          <h3><Time time={time} format="hh:mm A, ddd D MMM" /></h3>
          <List className="itinerary__sessions">
            {group.map(session => {
              const waitlisted = waitlists.includes(session.id)

              return (
                <List.Item
                  key={session.id}
                  className={classNames(
                    'preferences__session',
                    waitlisted && 'preferences__session--waitlisted'
                  )}
                  primary={session.activity.name}
                  icon={waitlisted ? 'clock' : 'check'}
                  as={Link}
                  to={`/admin/${time.year()}/activities/workshops/${session.activity.slug}/${session.id}`}
                />
              )
            })}
          </List>
        </section>
      ))}
    </div>
  )
}

Itinerary.propTypes = {
  sessions: PropTypes.arrayOf(PropTypes.session.isRequired),
  workshops: PropTypes.arrayOf(PropTypes.id.isRequired).isRequired,
  waitlists: PropTypes.arrayOf(PropTypes.id.isRequired).isRequired,
  onResendItinerary: PropTypes.func.isRequired,
}

Itinerary.defaultProps = {
  sessions: [],
}

export default Itinerary
