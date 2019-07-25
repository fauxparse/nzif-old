import React from 'react'
import PropTypes from 'lib/proptypes'
import Button from 'atoms/button'
import { LEVELS } from 'atoms/level'

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
  level: PropTypes.activityLevel.isRequired,
  selected: PropTypes.bool,
}

const Levels = ({ levels, onClick }) => (
  <div className="activity-levels">
    {Object.keys(LEVELS).map(level => (
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
  levels: PropTypes.arrayOf(PropTypes.activityLevel.isRequired).isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Levels
