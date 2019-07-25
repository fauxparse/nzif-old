import React from 'react'
import PropTypes from 'lib/proptypes'
import Tooltip from 'atoms/tooltip'
import Tag from 'atoms/tag'

import './index.scss'

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

const Level = ({ level, ...props }) => (
  <Tooltip title={LEVELS[level].description}>
    <Tag className="activity-level" data-level={level} {...props}>
      {LEVELS[level].name}
    </Tag>
  </Tooltip>
)

Level.propTypes = {
  level: PropTypes.activityLevel.isRequired,
}

export default Level
