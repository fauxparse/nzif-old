import React from 'react'
import PropTypes from 'prop-types'
import Bullet from '../shared/bullet'
import Markdown from '../shared/markdown'
import SkeletonText from '../shared/skeleton_text'
import Detail from '../shared/detail'
import Associated from './associated'

const FILLER = `Whoa, wait, Doc. Okay, real mature guys. Okay, Biff, will you pick up my books?
he's an idiot, comes from upbringing, parents were probably idiots too.
Lorraine, if you ever have a kid like that, I'll disown you. Jesus. Which one's
your pop?

Marty you gotta come back with me. That's George McFly? Thanks. Yeah okay. Doc,
I'm from the future. I came here in a time machine that you invented. Now, I
need your help to get back to the year 1985.`

const ActivityDescription = ({ loading, activity }) => (
  <div className="activity-description">
    <Bullet />
    <Detail icon="info">
      <SkeletonText loading={loading}>
        <Markdown text={activity.description || FILLER} />
      </SkeletonText>
    </Detail>
    {activity.associated && activity.associated.map(associatedActivity => (
      <Associated key={associatedActivity.id} {...associatedActivity} />
    ))}
  </div>
)

ActivityDescription.propTypes = {
  loading: PropTypes.bool.isRequired,
  activity: PropTypes.shape({
    description: PropTypes.string
  })
}

export default ActivityDescription
