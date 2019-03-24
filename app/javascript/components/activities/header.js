import React, { useEffect, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import stickybits from 'stickybits'
import { Picture } from 'react-responsive-picture'
import CommonProps from '../../lib/common_props'
import Breadcrumbs from '../shared/breadcrumbs'
import Skeleton from '../shared/skeleton_text'
import Duotone from '../shared/duotone'
import Presenter from '../shared/presenter'
import Sentence from '../shared/sentence'
import EditButton from './edit_button'

const ActivityHeader = ({ loading, activity }) => {
  const breadcrumbs = useRef()
  const sticky = useRef()

  useEffect(() => {
    sticky.current && sticky.current.cleanup()
    sticky.current = stickybits(breadcrumbs.current, {
      useFixed: true,
      useGetBoundingClientRect: true,
    })
    return () => sticky.current.cleanup()
  }, [activity, breadcrumbs])

  const presenters = useMemo(() => {
    const { presenters = [] } = activity || {}
    const differentOrigins = new Set(presenters.map(p => p.origin)).size > 1
    return presenters.map((presenter, i) => ({
      ...presenter,
      origin: differentOrigins || (i === presenters.length - 1) ? presenter.origin : undefined,
    }))
  }, [activity])

  return (
    <header className="activity-header" data-theme="dark">
      {activity.image && (
        <Duotone>
          <Picture
            className="activity-header__background"
            sources={[
              {
                srcSet: `${activity.image.thumbnail}, ${activity.image.small} 2x`,
                media: '(max-width: 384px)'
              },
              {
                srcSet: `${activity.image.medium}, ${activity.image.full} 2x`,
                media: '(max-width: 960px)'
              },
              {
                srcSet: activity.image.full
              }
            ]}
            alt={activity.name}
          />
        </Duotone>
      )}
      <div className="activity-header__breadcrumbs">
        <Breadcrumbs
          ref={breadcrumbs}
          back={`/${activity.festival.year}/${activity.type}s`}
        >
          <Breadcrumbs.Link to={`/${activity.festival.year}/${activity.type}s`}>
            {pluralize(activity.type)}
          </Breadcrumbs.Link>
          <EditButton activity={activity} />
        </Breadcrumbs>
      </div>
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
    </header>
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
