import React, { useMemo } from 'react'
import entries from 'lodash/entries'
import first from 'lodash/first'
import groupBy from 'lodash/groupBy'
import keyBy from 'lodash/keyBy'
import sortBy from 'lodash/sortBy'
import moment from 'lib/moment'
import Badge from 'atoms/badge'
import Time from 'atoms/time'
import List from 'molecules/list'
import { usePreferentialOrdering } from 'lib/hooks'

const Preferences = ({ sessions, preferences }) => {
  const days = useMemo(() => (
    sortBy(entries(groupBy(sessions, session => moment(session.startsAt).valueOf())), [first])
    .map(([time, group]) => [moment(parseInt(time, 10)), sortBy(group, s => s.activity.name)])
  ), [sessions])

  const sessionsById = useMemo(() => (keyBy(sessions, session => session.id)), [sessions])

  const [ordering, toggle, reset] = usePreferentialOrdering(groupBy(
    sortBy(preferences, [p => p.position]).map((p) => sessionsById[p.sessionId]),
    a => a.startsAt.valueOf()
  ))

  const positions = useMemo(() => (
    sessions.reduce((h, session) => ({
      ...h,
      [session.id]: (ordering[session.startsAt.valueOf()] || []).indexOf(session) + 1 || undefined,
    }), {})
  ), [sessions, ordering])

  const workshopCount = useMemo(() => (
    entries(ordering).filter(([_, s]) => s.length).length
  ), [ordering])

  return (
    <div className="registration-details__preferences">
      {workshopCount ? (
        <p className="preferences__count">
          Maximum of <Badge>{workshopCount}</Badge> workshop{workshopCount > 1 ? 's' : ''} from
          the following:
        </p>
      ) : (
        <p className="preferences__count">
          No workshop preferences selected.
        </p>
      )}
      {days.map(([time, group]) => (
        <section key={time.valueOf()} className="preferences__time">
          <h3><Time time={time} format="hh:mm A, ddd D MMM" /></h3>
          <List className="preferences__sessions">
            {group.map(session => (
              <List.Item
                key={session.id}
                className="preferences__session"
                primary={session.activity.name}
                data-position={positions[session.id]}
                onClick={() => toggle(session)}
              >
                <Badge>{positions[session.id]}</Badge>
              </List.Item>
            ))}
          </List>
        </section>
      ))}
    </div>
  )
}

export default Preferences
