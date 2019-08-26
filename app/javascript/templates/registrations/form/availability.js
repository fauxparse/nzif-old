import React, { useCallback, useEffect, useMemo, useState } from 'react'
import invert from 'lodash/invert'
import product from 'lib/product'
import Checkbox from 'atoms/checkbox'
import Hint from 'atoms/hint'
import Label from 'atoms/label'
import Time from 'atoms/time'
import Tags from 'molecules/tags'
import Field from 'molecules/field'
import { useRegistration } from 'contexts/registration'
import Heading from './heading'

const ROLE_LABELS = {
  player: 'Player',
  director: 'Director',
  mc: 'MC'
}

const ROLE_VALUES = invert(ROLE_LABELS)

const Availability = () => {
  const { registration, allInShows, change } = useRegistration()

  const { availability = [] } = registration

  const [roles, setRoles] = useState(['player'])

  const [sessions, setSessions] = useState([])

  useEffect(() => {
    if (availability.length) {
      const newRoles = Array.from(availability.reduce((set, { role }) => set.add(role), new Set()))
      setRoles(newRoles)
      const newSessions =
        Array.from(availability.reduce((set, { sessionId }) => set.add(sessionId), new Set()))
      setSessions(newSessions)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const availableRoles = useMemo(() => Object.values(ROLE_LABELS), [])

  const roleLabels = useMemo(() => roles.map(role => ROLE_LABELS[role]), [roles])

  const updateAvailability = useCallback((sessions, roles) => {
    const availability = product(roles, sessions).map(([role, sessionId]) => ({ role, sessionId }))
    change({ availability })
  }, [change])

  const rolesChanged = useCallback((roles) => {
    const newRoles = roles.map(role => ROLE_VALUES[role])
    setRoles(newRoles)
    updateAvailability(sessions, newRoles)
  }, [setRoles, sessions, updateAvailability])

  const sessionChanged = useCallback((e) => {
    const newSessions = e.target.checked ? (
      [...sessions, e.target.value]
    ) : (
      sessions.filter(id => id !== e.target.value)
    )
    setSessions(newSessions)
    updateAvailability(newSessions, roles)
  }, [sessions, roles, setSessions, updateAvailability])

  return (
    <section className="registration-form__section registration-form__availability">
      <Heading>All-in show availability</Heading>
      <p>
        New in 2019, The All-In, All-Out Improv Bout is a show open to all Festival participants,
        based on Keith Johnstone’s Maestro Impro&trade; format (licensed by the International
        Theatresports Institute).
      </p>
      <p>
        We’re looking for players, MCs, and directors. If you’d like to be involved, select the
        times you’re available and the roles you think you’ll suit. <b>Note:</b> While everyone
        is welcome (and encouraged!) to play, casting of MCs and directors will be at the
        discretion of the show’s overall director.
      </p>
      <div className="registration-form__show-times">
        {allInShows.map(session => (
          <Checkbox
            key={session.id}
            className="registration-form__show-time"
            checked={sessions.includes(session.id)}
            value={session.id}
            onChange={sessionChanged}
          >
            <Time time={session.startsAt} format="h:mm A, dddd D MMMM" />
          </Checkbox>
        ))}
      </div>
      <Field className="registration-form__show-roles">
        <Label>Please consider me as a:</Label>
        <Tags
          tags={availableRoles}
          selected={roleLabels}
          onChange={rolesChanged}
        />
        <Hint>(Select all that apply)</Hint>
      </Field>
    </section>
  )
}

export default Availability
