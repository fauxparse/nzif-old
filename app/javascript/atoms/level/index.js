import React from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
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

const Level = ({ className, level, tiny, ...props }) => {
  const { name, description } = LEVELS[level]

  const tooltip = tiny ? `${name}: ${description}` : description

  return (
    <Tooltip title={tooltip} trigger="click" delay={0}>
      <Tag
        className={classNames('activity-level', tiny && 'activity-level--tiny', className)}
        data-level={level}
        {...props}
      >
        {tiny ? LEVELS[level].name[0] : LEVELS[level].name}
      </Tag>
    </Tooltip>
  )
}

Level.propTypes = {
  level: PropTypes.activityLevel.isRequired,
  tiny: PropTypes.bool,
}

Level.defaultProps = {
  tiny: false
}

export default Level
