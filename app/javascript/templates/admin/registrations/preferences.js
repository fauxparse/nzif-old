import React, { useEffect, useMemo } from 'react'
import PropTypes from 'lib/proptypes'
import entries from 'lodash/entries'
import first from 'lodash/first'
import groupBy from 'lodash/groupBy'
import keyBy from 'lodash/keyBy'
import sortBy from 'lodash/sortBy'
import isEqual from 'lodash/isEqual'
import moment from 'lib/moment'
import Badge from 'atoms/badge'
import Time from 'atoms/time'
import List from 'molecules/list'
import { usePreferentialOrdering } from 'lib/hooks'

const Preferences = ({ sessions, preferences, onChange }) => {
  const days = useMemo(() => (
    sortBy(entries(groupBy(sessions, session => moment(session.startsAt).valueOf())), [first])
    .map(([time, group]) => [moment(parseInt(time, 10)), sortBy(group, s => s.activity.name)])
  ), [sessions])

  const sessionsById = useMemo(() => (keyBy(sessions, session => session.id)), [sessions])

  const [ordering, toggle] = usePreferentialOrdering(groupBy(
    sortBy(preferences, [p => p.position]).map((p) => sessionsById[p.sessionId]),
    a => a.startsAt.valueOf()
  ))

  const positions = useMemo(() => (
    sessions.reduce((h, session) => ({
      ...h,
      [session.id]:
        (ordering[session.startsAt.valueOf()] || [])
          .findIndex(s => s.id === session.id) + 1 || undefined,
    }), {})
  ), [sessions, ordering])

  const workshopCount = useMemo(() => (
    entries(ordering).filter(([_, s]) => s.length).length
  ), [ordering])

  useEffect(() => {
    const changed = entries(ordering).reduce((result, [_, list]) => ([
      ...result,
      ...list.map((w, i) => ({ sessionId: w.id, position: i + 1, __typename: 'Preference' }))
    ]), [])

    if (onChange && !isEqual(changed, preferences)) {
      onChange({ preferences: changed })
    }
  }, [preferences, ordering, onChange])

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

Preferences.propTypes = {
  sessions: PropTypes.arrayOf(PropTypes.session.isRequired),
  preferences: PropTypes.arrayOf(PropTypes.shape({
    sessionId: PropTypes.id.isRequired,
    position: PropTypes.number.isRequired,
  })),
  onChange: PropTypes.func.isRequired,
}

Preferences.defaultProps = {
  sessions: [],
  onChange: null,
}

export default Preferences
