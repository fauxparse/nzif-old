import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from 'react-apollo-hooks'
import PageContent from '../page_content'
import moment from '../../lib/moment'
import ACTIVITIES_QUERY from '../../queries/activities_by_day'
import ActivityDay from './day'

const dummy = type =>
  new Array(8).fill(0).map((_, i) => ({
    date: moment().add(i, 'day'),
    activities: new Array(6).fill(0).map((_, id) => ({
      id,
      type,
      name: 'Workshop or show name',
      description: 'Short description of the workshop or show (10–15 words max)',
      presenters: [],
      sessions: [{
        startsAt: moment().add(i, 'day').startOf('day').add((id % 2) * 4 + 10, 'hours'),
        endsAt: moment().add(i, 'day').startOf('day').add((id % 2) * 4 + 13, 'hours'),
      }],
    }))
  }))

const Activities = ({ match }) => {
  const type = match.params.type.replace(/s$/, '')
  const { year } = match.params

  const { loading, data } = useQuery(ACTIVITIES_QUERY, { variables: { year, type } })

  const days = useMemo(() => {
    if (loading) {
      return dummy(type)
    } else {
      return data.festival.days.map(({ date, activities }) => {
        const day = moment(date)
        return {
          date: day,
          activities: activities.map((activity) => {
            const sessions = activity.sessions.map((session) => {
              const startsAt = moment(session.startsAt)
              const endsAt = moment(session.endsAt)
              if (startsAt.isSame(day, 'day')) {
                return { ...session, startsAt, endsAt }
              } else {
                return null
              }
            }).filter(Boolean)
            return { ...activity, sessions }
          })
        }
      })
    }
  }, [loading, data, type])

  return (
    <PageContent className="section--activities">
      {days.map(({ date, activities }) => activities.length > 0 &&
        <ActivityDay key={date} date={moment(date)} activities={activities} loading={loading} />
      )}
    </PageContent>
  )
}

Activities.propTypes = {
  match: PropTypes.object.isRequired
}

export default Activities
