import React from 'react'
import PropTypes from 'prop-types'
import Activity from './activity'

const ActivityList = ({ activities, loading }) => (
  <div className="activities__list">
    {activities.map(activity => (
      <Activity key={activity.id} activity={activity} loading={loading} />
    ))}
  </div>
)

ActivityList.propTypes = {
  activities: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default ActivityList
