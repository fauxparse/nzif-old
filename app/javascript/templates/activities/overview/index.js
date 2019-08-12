import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'lib/proptypes'
import sortBy from 'lodash/sortBy'
import pluralize from 'pluralize'
import moment from 'lib/moment'
import humanize from 'lib/humanize'
import Tab from 'atoms/tab'
import Breadcrumbs from 'molecules/breadcrumbs'
import TabBar from 'molecules/tab_bar'
import Header from 'organisms/header'
import dummy from './dummy'
import Day from './day'

import './index.scss'

const Overview = ({ loading, type, activities, festival }) => {
  const activitiesByDay = useMemo(() => (
    (loading || !activities) ? dummy() : activities.map(day => {
      const date = moment(day.date)
      const sessions = day.activities.reduce((activities, activity) => ([
        ...activities,
        ...activity.sessions.map(session => ({
          ...activity,
          startsAt: moment(session.startsAt),
          endsAt: moment(session.endsAt),
        })).filter(s => s.startsAt.isSame(date, 'day'))
      ]), [])

      return { date, activities: sortBy(sessions, [s => s.startsAt.valueOf, s => s.name]) }
    }).filter(({ activities }) => activities.length)
  ), [loading, activities])

  const back = `/${festival.year}`

  const title = useMemo(() => pluralize(humanize(type)), [type])

  return (
    <div
      className="activities-overview"
      aria-busy={loading || undefined}
    >
      <Header colored>
        <Breadcrumbs back={back}>
          <Breadcrumbs.Link to={back}>NZIF {festival.year}</Breadcrumbs.Link>
        </Breadcrumbs>
        <Header.Title>{festival.year} Programme</Header.Title>
        <TabBar>
          <Tab
            as={Link}
            to={`/${festival.year}/workshops`}
            selected={type === 'workshop'}
            text="Workshops"
          />
          <Tab
            as={Link}
            to={`/${festival.year}/shows`}
            selected={type === 'show'}
            text="Shows"
          />
        </TabBar>
      </Header>
      <div className="activities-overview__days">
        {activitiesByDay.map(day => (
          <Day
            key={day.date.valueOf()}
            date={day.date}
            activities={day.activities}
            loading={loading}
          />
        ))}
      </div>
    </div>
  )
}

Overview.propTypes = {
  loading: PropTypes.bool,
  type: PropTypes.activityType.isRequired,
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.time.isRequired,
      activities: PropTypes.arrayOf(PropTypes.activity.isRequired).isRequired,
    }).isRequired
  ).isRequired,
  festival: PropTypes.shape({ year: PropTypes.id.isRequired }),
}

Overview.defaultProps = {
  loading: false,
  activities: [],
  festival: { year: new Date().getYear() + 1900 },
}

export default Overview
