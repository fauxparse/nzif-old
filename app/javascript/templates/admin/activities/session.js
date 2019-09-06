import React, { useCallback, useMemo } from 'react'
import PropTypes from 'lib/proptypes'
import Label from 'atoms/label'
import Field from 'molecules/field'
import Select from 'molecules/select'

const Session = ({ activity, session, venues, onChange }) => {
  const venueOptions = useMemo(() => venues.map(v => ({ id: v.id, label: v.name })), [venues])

  const changed = useCallback(changes => onChange(session, changes), [session, onChange])

  const venueChanged = useCallback(venueId => changed({ venueId }), [changed])

  return (
    <div className="edit-activity__session">
      <Field icon="venue">
        <Label>Venue</Label>
        <Select
          value={session.venue && session.venue.id}
          options={venueOptions}
          onChange={venueChanged}
        />
      </Field>
    </div>
  )
}

Session.propTypes = {
  activity: PropTypes.activity.isRequired,
  session: PropTypes.session.isRequired,
  venues: PropTypes.arrayOf(PropTypes.venue.isRequired).isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Session
