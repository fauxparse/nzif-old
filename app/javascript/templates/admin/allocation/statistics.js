import React, { useCallback, useMemo } from 'react'
import PropTypes from 'lib/proptypes'
import entries from 'lodash/entries'
import mapValues from 'lodash/mapValues'

const Statistics = ({ allocations, registrations }) => {
  const totalWaitlisted = useMemo(() => (
    entries(allocations).reduce((total, [, { unallocated }]) => total + unallocated.length, 0)
  ), [allocations])

  const sessions = useMemo(() => (
    entries(allocations)
      .reduce((byId, [, { unallocated, ...rest }]) => ({
        ...byId,
        ...mapValues(rest, row => row.map(s => s.registrationId)),
      }), {})
  ), [allocations])

  console.log(sessions)

  const firstChoicePercentage = useCallback((registration) => {
    const firstChoices = registration.preferences.filter(p => p.position === 1)
    if (!firstChoices.length) return 0
    const satisfied = firstChoices.filter(p => sessions[p.sessionId].includes(registration.id))
    return satisfied.length * 100 / firstChoices.length
  }, [sessions])

  const satisfaction = useMemo(() => (
    registrations.reduce((t, r) => t + firstChoicePercentage(r), 0) / registrations.length
  ), [registrations, firstChoicePercentage])

  return (
    <dl className="allocation__statistics">
      <dt>Total waitlisted</dt>
      <dd>{totalWaitlisted}</dd>
      <dt>Average satisfaction</dt>
      <dd>{Math.round(satisfaction * 1000) / 1000}%</dd>
    </dl>
  )
}

Statistics.propTypes = {
  allocations: PropTypes.objectOf(
    PropTypes.objectOf(PropTypes.arrayOf(PropTypes.allocation.isRequired)),
  ).isRequired,
  registrations: PropTypes.arrayOf(PropTypes.registration.isRequired).isRequired,
}

export default Statistics