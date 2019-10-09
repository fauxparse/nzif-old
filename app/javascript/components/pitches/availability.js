import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import sortBy from 'lodash/sortBy'
import { Checkbox, Errors, Field, Hint,  Textarea } from '../form'
import Date from 'atoms/date'
import Time from 'atoms/time'
import moment from 'lib/moment'

const Availability = ({ pitch, errors, onChange }) => {
  const { activityType, slots, availability, festival } = pitch

  const allSlots = useMemo(() => sortBy(
    festival.slots
      .filter(slot => slot.activityType === activityType)
      .map(slot => {
        const startTime = moment(slot.startsAt)
        const endTime = moment(slot.endsAt)
        const repeats = endTime.diff(startTime, 'days') + 1
        return { ...slot, repeats }
      }),
    slot => slot.startsAt
  ), [festival, activityType])

  const toggleSlot = useCallback((e) => {
    const { value, checked } = e.target
    onChange('slots', checked ? [...slots, value] : slots.filter(slot => slot !== value))
  }, [onChange, slots])

  return (
    <section className="pitch-section pitch-section--availability">
      <h2 className="section-title pitch-section__title">Your availability</h2>
      <Field className="pitch__field">
        <p>When are you available to present this content? Please select all that apply:</p>
        {allSlots.map(({ startsAt, endsAt, repeats }) => (
          <Checkbox
            key={startsAt}
            name="slots"
            value={startsAt}
            checked={slots.includes(startsAt)}
            onChange={toggleSlot}
            className="pitch__slot"
          >
            <b>
              <Date date={[startsAt, endsAt]} />
              {repeats > 1 && ` (${repeats} shows)`}
            </b>
            <small><Time time={[startsAt, endsAt]} /></small>
          </Checkbox>
        ))}
      </Field>

      <Field className="pitch__field">
        <p>
          Do you plan to be in Wellington for all of NZIF, or are there
          restrictions on when you can participate?
        </p>
        <Textarea
          value={availability}
          minRows={3}
          onChange={e => onChange('availability', e.target.value)}
        />
        {festival && (
          <Hint>
            Festival dates are{' '}
            <Date date={[festival.startDate, festival.endDate]} />.
          </Hint>
        )}
        <Errors from={errors} name="availability" />
      </Field>
    </section>
  )
}

Availability.propTypes = {
  pitch: PropTypes.shape({
    activityType: PropTypes.string.isRequired,
    slots: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    availability: PropTypes.string,
    festival: PropTypes.shape({
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
      slots: PropTypes.arrayOf(PropTypes.shape({
        startsAt: PropTypes.string.isRequired,
        endsAt: PropTypes.string.isRequired,
        activityType: PropTypes.string.isRequired,
      }).isRequired).isRequired,
    }).isRequired,
  }).isRequired,
  errors: PropTypes.object,
  onChange: PropTypes.func.isRequired,
}

export default Availability
