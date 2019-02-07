import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import ACTIVITY_QUERY from '../../queries/activity'
import PageContent from '../page_content'
import Header from './header'
import Summary from './summary'
import Description from './description'
import Presenters from './presenters'

const ActivityDetails = ({ match }) => {
  const type = match.params.type.replace(/s$/, '')
  const slug = match.params.slug
  const year = parseInt(match.params.year, 10)
  const dummy = { type, slug, name: slug, festival: { year }, associated: [] }

  return (
    <PageContent>
      <Query query={ACTIVITY_QUERY} variables={{ year, type, slug }}>
        {({ loading, data: { activity } }) => (
          <>
            <Header loading={loading} activity={activity || dummy} />
            <Summary loading={loading} activity={activity || dummy} />
            <Description loading={loading} activity={activity || dummy} />
            <Presenters loading={loading} presenters={activity ? activity.presenters : []} />
          </>
        )}
      </Query>
    </PageContent>
  )
}

ActivityDetails.propTypes = {
  match: PropTypes.object.isRequired
}

export default ActivityDetails
