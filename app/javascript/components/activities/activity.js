import React from 'react'
import PropTypes from 'prop-types'
import CommonProps from '../../lib/common_props'
import TextLink from '../../components/shared/text_link'
import Skeleton from '../shared/skeleton_text'
import Markdown from '../shared/markdown'
import Sentence from '../shared/sentence'
import Presenter from '../shared/presenter'

const truncate = str =>
  str
    .split('\n')[0]
    .replace(/^((?:\w+\W+){1,15})(.*)/, (_, match, rest) => `${match}${rest ? '…' : ''}`)

const Activity = ({ activity = {}, loading }) => (
  <article className="card activity activities__activity">
    {loading ? (
      <div className="skeleton skeleton--loading activity__thumbnail--placeholder" />
    ) : (
      <img
        className="activity__thumbnail card__image"
        src={activity.image && activity.image.thumbnail}
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
    <Skeleton
      as="div"
      className="skeleton--text card__content activity__description--short"
      loading={loading}
    >
      <Markdown text={truncate(activity.description || '')} />
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
  activity: CommonProps.activity,
  loading: PropTypes.bool.isRequired,
}

export default Activity
