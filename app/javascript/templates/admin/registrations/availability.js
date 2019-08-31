import React, { useCallback, useMemo } from 'react'
import PropTypes from 'lib/proptypes'
import invert from 'lodash/invert'
import product from 'lib/product'
import Checkbox from 'atoms/checkbox'
import Time from 'atoms/time'
import Field from 'molecules/field'
import Tags from 'molecules/tags'

const ROLE_LABELS = {
  player: 'Player',
  director: 'Director',
  mc: 'MC'
}

const ROLE_VALUES = invert(ROLE_LABELS)

const availableRoles = Object.values(ROLE_LABELS)

const Availability = ({ allInShows, availability, onChange }) => {
  const roles = useMemo(() => (
    availability.reduce((set, { role }) => set.add(role), new Set())
  ), [availability])

  const roleLabels = useMemo(() => Array.from(roles).map(role => ROLE_LABELS[role]), [roles])

  const sessionIds = useMemo(() => (
    availability.reduce((set, { sessionId }) => set.add(sessionId), new Set())
  ), [availability])

  const updateAvailability = useCallback((sessions, roles) => {
    const availability = product(roles, sessions)
      .map(([role, sessionId]) => ({ role, sessionId, __typename: 'Availability' }))
    onChange({ availability })
  }, [onChange])

  const rolesChanged = useCallback((roles) => {
    updateAvailability(sessionIds, roles.map(role => ROLE_VALUES[role]))
  }, [sessionIds, updateAvailability])

  const sessionChanged = useCallback((e) => {
    const newSessions = new Set(sessionIds)
    const { checked, value } = e.target

    if (checked) {
      newSessions.add(value)
    } else {
      newSessions.delete(value)
    }

    const newRoles = roles.size ? roles : new Set(['player'])

    updateAvailability(newSessions, newRoles)
  }, [roles, sessionIds, updateAvailability])

  return (
    <div className="registration-details__availability">
      {allInShows.map(session => (
        <Checkbox
          key={session.id}
          className="registration-form__show-time"
          checked={sessionIds.has(session.id)}
          value={session.id}
          onChange={sessionChanged}
        >
          <Time time={session.startsAt} format="h:mm A, dddd D MMMM" />
        </Checkbox>
      ))}
      <Field className="registration-form__show-roles">
        <Tags
          tags={availableRoles}
          selected={roleLabels}
          onChange={rolesChanged}
        />
      </Field>
    </div>
  )
}

Availability.propTypes = {
  allInShows: PropTypes.arrayOf(PropTypes.session.isRequired),
  availability: PropTypes.arrayOf(PropTypes.shape({
  })),
  onChange: PropTypes.func.isRequired,
}

Availability.defaultProps = {
  allInShows: [],
  availability: [],
  onChange: null,
}

export default Availability
