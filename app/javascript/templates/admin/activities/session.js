import React, { useCallback, useMemo } from 'react'
import PropTypes from 'lib/proptypes'
import Label from 'atoms/label'
import Field from 'molecules/field'
import NumberField from 'molecules/number_field'
import Select from 'molecules/select'
import Roll from './roll'

const Session = ({ activity, session, venues, onChange, onRollChange }) => {
  const venueOptions = useMemo(() => venues.map(v => ({ id: v.id, label: v.name })), [venues])

  const changed = useCallback(changes => onChange(session, changes), [session, onChange])

  const venueChanged = useCallback(venueId => changed({ venueId }), [changed])

  const capacityChanged = useCallback(capacity => changed({ capacity }), [changed])

  const rollChanged = useCallback((changes) => (
    onRollChange(session, changes)
  ), [session, onRollChange])

  return (
    <div className="edit-activity__session">
      <div className="edit-activity__session-details">
        <Field icon="venue">
          <Label>Venue</Label>
          <Select
            value={session.venue && session.venue.id}
            options={venueOptions}
            onChange={venueChanged}
          />
        </Field>
        {activity.type === 'workshop' && (
          <Field>
            <Label>Capacity</Label>
            <NumberField
              value={session.capacity}
              min={0}
              onChange={capacityChanged}
            />
          </Field>
        )}
      </div>
      {activity.type === 'workshop' && (
        <Roll
          placements={session.placements}
          waitlist={session.waitlist}
          capacity={session.capacity}
          onChange={rollChanged}
        />
      )}
    </div>
  )
}

Session.propTypes = {
  activity: PropTypes.activity.isRequired,
  session: PropTypes.session.isRequired,
  venues: PropTypes.arrayOf(PropTypes.venue.isRequired).isRequired,
  onChange: PropTypes.func.isRequired,
  onRollChange: PropTypes.func.isRequired,
}

export default Session
