import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../button'

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
  levels: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Levels
