import React from 'react'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import Breadcrumbs from '../shared/breadcrumbs'
import Skeleton from '../shared/skeleton_text'
import Duotone from '../shared/duotone'
import Presenter from '../shared/presenter'
import Sentence from '../shared/sentence'
import EditButton from './edit_button'

const ActivityHeader = ({ loading, activity }) => (
  <header className="activity-header" data-theme="dark">
    {activity.image && (
      <Duotone src={activity.image.full}>
        <img className="activity-header__background" src={activity.image.full} />
      </Duotone>
    )}
    <Breadcrumbs
      className="activity-header__breadcrumbs"
      back={`/${activity.festival.year}/${activity.type}s`}
    >
      <Breadcrumbs.Link to={`/${activity.festival.year}/${activity.type}s`}>
        {pluralize(activity.type)}
      </Breadcrumbs.Link>
    </Breadcrumbs>
    <EditButton activity={activity} />
    <Skeleton loading={loading} as="h1" className="activity-header__name">
      {activity.name}
    </Skeleton>
    <Skeleton loading={loading} as="h2" className="activity-header__presenters">
      {loading ? (
        'Presenter names go here'
      ) : (
        <Sentence>
          {activity.presenters.map(presenter => <Presenter key={presenter.id} {...presenter} />)}
        </Sentence>
      )}
    </Skeleton>
  </header>
)

ActivityHeader.propTypes = {
  loading: PropTypes.bool.isRequired,
  activity: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    festival: PropTypes.shape({
      year: PropTypes.number.isRequired
    }).isRequired
  })
}

export default ActivityHeader
