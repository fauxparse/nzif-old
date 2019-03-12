import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import PageContent from '../page_content'
import Activity from './activity'
import Skeleton from '../shared/skeleton_text'
import Date from '../shared/date'
import moment from '../../lib/moment'
import ACTIVITIES_QUERY from '../../queries/activities_by_day'

const dummy = type =>
  new Array(8).fill(0).map((_, i) => ({
    date: moment().add(i, 'day'),
    activities: new Array(3).fill(0).map((_, id) => ({
      id,
      type,
      name: 'Workshop or show name',
      description: 'Short description of the workshop or show (10–15 words max)',
      presenters: []
    }))
  }))

const Activities = ({ match }) => {
  const type = match.params.type.replace(/s$/, '')
  const { year } = match.params

  return (
    <PageContent className="section--activities">
      <Query query={ACTIVITIES_QUERY} variables={{ year, type }}>
        {({ loading, data }) =>
          (loading ? dummy(type) : data.festival.days).map(
            ({ date, activities }) =>
              !activities.length ? null : (
                <section key={date} className="activities__day">
                  <Skeleton as="h2" className="activities__date" loading={loading}>
                    <Date date={date} />
                  </Skeleton>
                  <div className="activities__list">
                    {activities.map(activity => (
                      <Activity key={activity.id} activity={activity} loading={loading} />
                    ))}
                  </div>
                </section>
              )
          )
        }
      </Query>
    </PageContent>
  )
}

Activities.propTypes = {
  match: PropTypes.object.isRequired
}

export default Activities
