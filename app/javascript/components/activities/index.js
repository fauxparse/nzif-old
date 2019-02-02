import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import PageContent from '../../components/page_content'
import Activity from './activity'

export const ACTIVITIES_QUERY = gql`
  query Activities($year: Int!, $type: ActivityType) {
    festival(year: $year) {
      year

      activities(type: $type) {
        id
        type
        name
        url

        presenters {
          id
          name
        }
      }
    }
  }
`

const Activities = ({ match }) => {
  const type = match.params.type.replace(/s$/, '')
  const year = parseInt(match.params.year, 10)

  return (
    <PageContent>
      <Query query={ACTIVITIES_QUERY} variables={{ year, type }}>
        {({ loading, data }) =>
          loading ? null : (
            <section className="section--activities">
              {data.festival.activities.map(activity => (
                <Activity key={activity.id} activity={activity} />
              ))}
            </section>
          )
        }
      </Query>
    </PageContent>
  )
}

Activities.propTypes = {
  match: PropTypes.object.isRequired,
}

export default Activities
