import React, { useMemo } from 'react'
import PropTypes from 'lib/proptypes'
import groupBy from 'lodash/groupBy'
import sortBy from 'lodash/sortBy'
import moment from 'lib/moment'
import Header from 'organisms/header'
import dummy from './dummy'
import Day from './day'

import './index.scss'

const Overview = ({ loading, activities }) => {
  const activitiesByDay = useMemo(() => (
    groupBy(
      sortBy(
        loading ? dummy() : activities,
        [a => a.name.toLowerCase()],
      ),
      a => a.startsAt.valueOf(),
    )
  ), [loading, activities])

  return (
    <div
      className="activities-overview"
      aria-busy={loading || undefined}
    >
      <Header>
        <Header.Title>Activities</Header.Title>
      </Header>
      {Object.keys(activitiesByDay).sort().map(t => (
        <Day
          key={t}
          date={moment(parseInt(t, 10))}
          activities={activitiesByDay[t]}
          loading={loading}
        />
      ))}
    </div>
  )
}

Overview.propTypes = {
  loading: PropTypes.bool,
  activities: PropTypes.arrayOf(PropTypes.activity.isRequired),
}

Overview.defaultProps = {
  loading: false,
  activities: [],
}

export default Overview
