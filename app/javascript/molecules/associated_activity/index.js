import React from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'

import './index.scss'

const AssociatedActivity = ({ activity }) => (
  <div className={classNames('associated-activity', `associated-activity--${activity.type}`)}>
    {activity.type === 'workshop' ? (
      `This show will be cast from the workshop ‘${activity.name}’.`
    ) : (
      `Participants in this workshop will have the opportunity to be cast in the show ‘${activity.name}’.`
    )}
    {' '}
    Note that show casting is at the director’s discretion, and participation in the workshop
    does not guarantee a performance opportunity.
  </div>
)

AssociatedActivity.propTypes = {
  activity: PropTypes.activity.isRequired,
}

export default AssociatedActivity
