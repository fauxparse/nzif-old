import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Checkbox } from '../form'
import { ACTIVITY_TYPES } from './constants'

const ActivityDetails = ({ pitch, errors, onChange }) => {
  const { activityType = ACTIVITY_TYPES[0].name } = pitch
  const { controller: Controller } = ACTIVITY_TYPES.find(({ name }) => name === activityType)

  return (
    <section className="pitch-section pitch-section--activity">
      <h2 className="section-title pitch-section__title">Your idea</h2>
      <p>
        What are you pitching for NZIF? Choose from the following activities:
      </p>
      <div className="pitch__activity-types">
        {ACTIVITY_TYPES.map(({ name, category, title, description }) => (
          <Checkbox
            key={name}
            name="type"
            type="radio"
            value={name}
            checked={activityType === name}
            className={classNames(
              'pitch__activity-type',
              { 'pitch__activity-type--selected': activityType === name }
            )}
            onChange={() => onChange('activityType', name)}
          >
            <i>{category}</i>
            <b>{title}</b>
            <small>{description}</small>
          </Checkbox>
        ))}
      </div>

      {Controller && <Controller pitch={pitch} errors={errors} onChange={onChange} />}
    </section>
  )
}

ActivityDetails.propTypes = {
  pitch: PropTypes.shape({
    activityType: PropTypes.string,
  }).isRequired,
  errors: PropTypes.object,
  onChange: PropTypes.func.isRequired,
}

export default ActivityDetails
