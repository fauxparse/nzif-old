import React from 'react'
import { Picture } from 'react-responsive-picture'
import PropTypes from 'lib/proptypes'
import TextLink from 'atoms/text_link'
import Skeleton from '../shared/skeleton_text'
import Sentence from 'atoms/sentence'
import Presenter from '../shared/presenter'

const Activity = ({ activity = {}, loading }) => (
  <article className="card activity activities__activity">
    {loading ? (
      <div className="skeleton skeleton--loading activity__thumbnail--placeholder" />
    ) : (
      <Picture
        className="activity__thumbnail card__image"
        sources={[
          {
            srcSet: `${activity.image.thumbnail}, ${activity.image.small} 2x`,
            media: '(max-width: 384px)',
          },
          {
            srcSet: `${activity.image.small}, ${activity.image.medium} 2x`,
          },
        ]}
        alt={activity.name}
      />
    )}
    <Skeleton as="h3" className="card__title activity__name" loading={loading}>
      {activity.name}
    </Skeleton>
    <Skeleton className="card__subtitle activity__presenters" loading={loading}>
      {loading ? (
        'Presenter names'
      ) : (
        <Sentence>
          {activity.presenters.map(presenter => <Presenter key={presenter.id} {...presenter} />)}
        </Sentence>
      )}
    </Skeleton>
    <footer className="card__actions activity__actions">
      {activity.url && (
        <TextLink to={activity.url} className="card__action">
          More details
        </TextLink>
      )}
    </footer>
  </article>
)

Activity.propTypes = {
  activity: PropTypes.activity,
  loading: PropTypes.bool.isRequired,
}

export default Activity
