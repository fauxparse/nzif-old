import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import PageContent from '../page_content'
import Activity from './activity'
import ACTIVITIES_QUERY from '../../queries/activities'

const Activities = ({ match }) => {
  const type = match.params.type.replace(/s$/, '')
  const year = parseInt(match.params.year, 10)

  return (
    <PageContent className="section--activities">
      <Query query={ACTIVITIES_QUERY} variables={{ year, type }}>
        {({ loading, data }) =>
          loading
            ? null
            : data.festival.activities.map(activity => (
                <Activity key={activity.id} activity={activity} />
              ))
        }
      </Query>
    </PageContent>
  )
}

Activities.propTypes = {
  match: PropTypes.object.isRequired
}

export default Activities
