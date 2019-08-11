import React from 'react'
import PropTypes from 'lib/proptypes'
import moment from 'lib/moment'
import { useSticky } from 'lib/hooks'
import Sentence from 'atoms/sentence'
import Level from 'atoms/level'
import Card from 'molecules/card'
import Skeleton from 'effects/skeleton'

const Day = ({ date, activities, loading }) => {
  const header = useSticky()

  return (
    <section className="day">
      <Skeleton ref={header} as="h2" className="day__date" loading={loading && false}>
        {moment(date).format('dddd D MMMM')}
      </Skeleton>
      <div className="day__activities">
        {activities.map(activity => (
          <Card
            key={activity.id}
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
            {activity.levels && (
              <Card.Tags>
                {activity.levels.map(level => <Level small key={level} level={level} />)}
              </Card.Tags>
            )}
          </Card>
        ))}
      </div>
    </section>
  )
}

Day.propTypes = {
  date: PropTypes.time.isRequired,
  loading: PropTypes.bool,
  activities: PropTypes.arrayOf(PropTypes.activity.isRequired).isRequired,
}

Day.defaultProps = {
  loading: false,
}

export default Day
