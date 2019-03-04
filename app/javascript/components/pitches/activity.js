import React, { useState } from 'react'
import classNames from 'classnames'
import Markdown from '../shared/markdown'
import { Checkbox } from '../form'
import { ACTIVITY_TYPES } from './constants'

const ActivityDetails = () => {
  const [activityType, setActivityType] = useState(ACTIVITY_TYPES[0].name)
  const { title, lookingFor } = ACTIVITY_TYPES.find(({ name }) => name === activityType)

  return (
    <section className="pitch-section pitch-section--activity">
      <h2 className="section-title pitch-section__title">Your idea</h2>
      <p>
        What are you pitching for NZIF? Choose from the following activities:
      </p>
      <div className="pitch__activity-types">
        {ACTIVITY_TYPES.map(({ name, title, description }) => (
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
            onChange={() => setActivityType(name)}
          >
            <b>{title}</b>
            <small>{description}</small>
          </Checkbox>
        ))}
      </div>
      <h2 className="section-title pitch-section__title">{title}</h2>
      <Markdown text={lookingFor} className="pitch__looking-for" />

    </section>
  )
}

export default ActivityDetails
