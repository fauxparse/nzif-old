import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'lib/proptypes'
import entries from 'lodash/entries'
import sortBy from 'lodash/sortBy'
import groupBy from 'lodash/groupBy'
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

const Overview = ({ loading, type, sessions, festival }) => {
  const sessionsByDay = useMemo(() => (
    sortBy(
      entries(
        groupBy(
          sortBy((loading || !sessions) ? dummy() : sessions, [
            session => session.startsAt.valueOf(),
            session => session.activity.name.toLocaleLowerCase(),
          ]),
          session => moment(session.startsAt).format('YYYY-MM-DD'),
        )
      ).map(([date, sessions]) => [moment(date), sessions]),
      [([date]) => date.valueOf()],
    )
  ), [loading, sessions])

  const back = `/${festival.year}`

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
        {sessionsByDay.map(([date, sessions]) => (
          <Day
            key={date.valueOf()}
            date={date}
            sessions={sessions}
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
  sessions: PropTypes.arrayOf(PropTypes.session.isRequired),
  festival: PropTypes.shape({ year: PropTypes.id.isRequired }),
}

Overview.defaultProps = {
  loading: false,
  activities: [],
  festival: { year: new Date().getYear() + 1900 },
}

export default Overview
