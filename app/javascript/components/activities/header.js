import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import CommonProps from '../../lib/common_props'
import PageHeader from '../shared/page_header'
import Skeleton from '../shared/skeleton_text'
import Presenter from '../shared/presenter'
import Sentence from '../shared/sentence'
import Breadcrumbs from '../shared/breadcrumbs'
import EditButton from './edit_button'

const ActivityHeader = ({ loading, activity }) => {
  const presenters = useMemo(() => {
    const { presenters = [] } = activity || {}
    const differentOrigins = new Set(presenters.map(p => p.origin)).size > 1
    return presenters.map((presenter, i) => ({
      ...presenter,
      origin: differentOrigins || (i === presenters.length - 1) ? presenter.origin : undefined,
    }))
  }, [activity])

  return (
    <PageHeader
      loading={loading}
      title={loading ? 'Loading' : activity.name}
      className="activity-header"
      controls={<EditButton activity={activity} />}
      back={`/${activity.festival.year}/${pluralize(activity.type)}`}
      background={activity.image}
      breadcrumbs={(
        <Breadcrumbs.Link to={`/${activity.festival.year}/${activity.type}s`}>
          {pluralize(activity.type)}
        </Breadcrumbs.Link>
      )}
    >
        <Skeleton loading={loading} as="h1" className="activity-header__name">
          {activity.name}
        </Skeleton>
        <Skeleton
          loading={loading}
          as="h2"
          className="activity-header__presenters"
        >
          {loading ? (
            'Presenter names go here'
          ) : (
            <Sentence>
              {presenters.map(presenter => (
                <Presenter key={presenter.id} {...presenter} />
              ))}
            </Sentence>
          )}
        </Skeleton>
    </PageHeader>
  )
}

ActivityHeader.propTypes = {
  loading: PropTypes.bool.isRequired,
  activity: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.shape({
      thumbnail: PropTypes.string.isRequired,
      small: PropTypes.string.isRequired,
      medium: PropTypes.string.isRequired,
      full: PropTypes.string.isRequired,
    }),
    festival: PropTypes.shape({
      year: CommonProps.id.isRequired
    }).isRequired
  })
}

export default ActivityHeader
