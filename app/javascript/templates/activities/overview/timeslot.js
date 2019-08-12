import React from 'react'
import PropTypes from 'lib/proptypes'
import { Link } from 'react-router-dom'
import pluralize from 'pluralize'
import { useSticky } from 'lib/hooks'
import Level from 'atoms/level'
import Sentence from 'atoms/sentence'
import Card from 'molecules/card'
import Skeleton from 'effects/skeleton'

const Timeslot = ({ loading, time, activities }) => {
  const header = useSticky()

  return (
    <div className="day__timeslot">
      <Skeleton ref={header} as="h3" className="day__time" loading={loading && false}>
        {time.format('h:mm A')}
      </Skeleton>
      <div className="day__activities">
        {activities.map(activity => (
          <Card
            key={activity.id}
            as={Link}
            to={`/${time.format('YYYY')}/${pluralize(activity.type)}/${activity.slug}`}
            loading={loading}
          >
            <Card.Image image={activity.image} />
            <Card.Category>{activity.type}</Card.Category>
            <Card.Title>{activity.name}</Card.Title>
            <Card.Description>
              <Sentence>
                {activity.presenters.map(p => p.name)}
              </Sentence>
            </Card.Description>
            <Card.Tags>
              {(activity.levels || []).map(level => <Level small key={level} level={level} />)}
            </Card.Tags>
          </Card>
        ))}
      </div>
    </div>
  )
}

Timeslot.propTypes = {
  loading: PropTypes.bool.isRequired,
  time: PropTypes.shape({
    format: PropTypes.func.isRequired,
  }).isRequired,
  activities: PropTypes.arrayOf(PropTypes.activity.isRequired).isRequired,
}

export default Timeslot
