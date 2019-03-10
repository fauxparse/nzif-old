import React from 'react'
import PropTypes from 'prop-types'
import upperFirst from 'lodash/upperFirst'
import { Checkbox } from '../form'

const LEVELS = [
  {
    level: 'beginner',
    experience: '< 1 year',
    description: 'Has learned the basics, limited performance experience',
  },
  {
    level: 'intermediate',
    experience: '1–4 years',
    description: 'Strong foundation, general performance experience',
  },
  {
    level: 'advanced',
    experience: '5+ years',
    description: 'Extensive performance experience, director/teacher',
  },
]

const ActivityLevel = ({ level, experience, description, checked, onChange }) => {
  return (
    <Checkbox className="pitch-level" value={level} checked={checked} onChange={onChange}>
      <div className="pitch-level__level">
        {upperFirst(level)}
        <small className="pitch-level__experience">{experience}</small>
      </div>
      <div className="pitch-level__description">{description}</div>
    </Checkbox>
  )
}

ActivityLevel.propTypes = {
  level: PropTypes.string.isRequired,
  experience: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

const ActivityLevels = ({ pitch, onChange }) => {
  const levels = new Set(pitch.activityLevels || [])
  const changed = (e) => {
    const { checked, value } = e.target
    checked ? levels.add(value) : levels.delete(value)
    onChange('activityLevels', Array.from(levels))
  }

  return (
    <div className="pitch__levels">
      {LEVELS.map(level => (
        <ActivityLevel
          key={level.level}
          checked={levels.has(level.level)}
          {...level}
          onChange={changed}
        />
      ))}
    </div>
  )
}

ActivityLevels.propTypes = {
  pitch: PropTypes.shape({
    activityLevels: PropTypes.arrayOf(PropTypes.string.isRequired),
  }).isRequired,
  onChange: PropTypes.func.isRequired,
}

export default ActivityLevels
