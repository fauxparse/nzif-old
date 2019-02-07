import React from 'react'
import CommonProps from '../../lib/common_props'
import Tooltip from './tooltip'

export const LEVELS = {
  beginner: {
    name: 'Beginner',
    description: 'You’ve learned the basics, but have limited performance experience',
  },
  intermediate: {
    name: 'Intermediate',
    description: 'You have a strong foundation, and some general performance experience',
  },
  advanced: {
    name: 'Advanced',
    description: 'You have extensive performance experience, and are a director or teacher',
  },
}

const Level = ({ level }) => (
  <Tooltip title={LEVELS[level].description}>
    <div className="activity-level" data-level={level}>
      {LEVELS[level].name}
    </div>
  </Tooltip>
)

Level.propTypes = {
  level: CommonProps.activityLevel.isRequired,
}

export default Level
