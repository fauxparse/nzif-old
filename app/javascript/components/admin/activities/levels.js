import React from 'react'
import PropTypes from 'prop-types'
import CommonProps from '../../../lib/common_props'
import Button from '../../../atoms/button'

const LEVELS = ['beginner', 'intermediate', 'advanced']

const Level = ({ level, selected, ...props }) => (
  <Button
    className="activity-level"
    data-level={level}
    role="checkbox"
    aria-checked={selected}
    {...props}
  >
    {level}
  </Button>
)

Level.propTypes = {
  level: CommonProps.activityLevel.isRequired,
  selected: PropTypes.bool,
}

const Levels = ({ levels, onClick }) => (
  <div className="activity-levels">
    {LEVELS.map(level => (
      <Level
        key={level}
        level={level}
        selected={(levels.indexOf(level) > -1) || undefined}
        onClick={onClick}
      />
    ))}
  </div>
)

Levels.propTypes = {
  levels: PropTypes.arrayOf(CommonProps.activityLevel.isRequired).isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Levels
