import React, { useMemo } from 'react'
import PropTypes from 'lib/proptypes'
import moment from 'lib/moment'
import entries from 'lodash/entries'
import first from 'lodash/first'
import groupBy from 'lodash/groupBy'
import keyBy from 'lodash/keyBy'
import sortBy from 'lodash/sortBy'
import Time from 'atoms/time'
import Breadcrumbs from 'molecules/breadcrumbs'
import Header from 'organisms/header'
import Participant from './participant'

import './index.scss'

const Allocation = ({ festival, seed, sessions, registrations, allocations, onShuffle }) => {
  const timeslots = useMemo(() => (
    sortBy(entries(groupBy(sessions, s => s.startsAt.valueOf())), [first])
    .map(([time, sessions]) => [moment(parseInt(time, 10)), sessions])
  ), [sessions])

  const registrationsById = useMemo(() => keyBy(registrations, r => r.id), [registrations])

  return (
    <div className="allocation">
      <Header className="allocation__header">
        <Breadcrumbs back={festival.adminRoot}>
          <Breadcrumbs.Link to={festival.adminRoot}>Dashboard</Breadcrumbs.Link>
        </Breadcrumbs>
        <Header.Button
          className="allocation__shuffle"
          icon="shuffle"
          text={seed.toString()}
          onClick={onShuffle}
        />
        <Header.Title>Workshop allocation</Header.Title>
      </Header>
      <div className="allocation__body">
        {timeslots.map(([time, sessions]) => (
          <section className="allocation__timeslot" key={time.valueOf()}>
            <h2 className="allocation__time">
              <Time time={time} format="h:mm A, dddd D MMMM" />
            </h2>
            <div className="allocation__sessions">
              {sessions.map(session => (
                <div className="allocation__session" key={session.id}>
                  <h4 className="allocation__session-name">
                    {session.activity.name}
                  </h4>
                  <div className="allocation__places">
                    {allocations[session.id].map(id => (
                      <Participant
                        key={id}
                        registration={registrationsById[id]}
                        session={session}
                        sessions={sessions}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="allocation__unsuccessful">
              {(allocations.unallocated[time.valueOf()] || []).map(id => (
                <Participant
                  key={id}
                  registration={registrationsById[id]}
                  session={null}
                  sessions={sessions}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

Allocation.propTypes = {
  festival: PropTypes.festival.isRequired,
  sessions: PropTypes.arrayOf(PropTypes.session.isRequired).isRequired,
  registrations: PropTypes.arrayOf(PropTypes.registration.isRequired).isRequired,
  allocations: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.id.isRequired).isRequired,
      PropTypes.objectOf(PropTypes.arrayOf(PropTypes.id.isRequired).isRequired).isRequired,
    ])
  ).isRequired,
  loading: PropTypes.bool,
  seed: PropTypes.id.isRequired,
  onShuffle: PropTypes.func.isRequired
}

Allocation.defaultProps = {
  loading: false,
}

export default Allocation
