import React, { useMemo } from 'react'
import partition from 'lodash/partition'
import MomentPropTypes from 'react-moment-proptypes'
import PropTypes from 'lib/proptypes'
import Skeleton from '../shared/skeleton_text'
import Date from 'atoms/date'
import TimeSlot from './time_slot'
import { useSticky } from 'lib/hooks'

const ActivityDay = ({ date, activities, loading }) => {
  const sticky = useSticky()

  const slots = useMemo(() => partition(
    activities,
    activity => activity.sessions[0].startsAt.hour() < 12
  ).filter(list => list.length), [activities])

  return (
    <section key={date} className="activities__day">
      <h2 ref={sticky} className="activities__date">
        <Skeleton loading={loading}>
          <Date date={date} />
        </Skeleton>
      </h2>
      {slots.map(slot => (
        <TimeSlot
          key={slot[0].sessions[0].startsAt.toISOString()}
          activities={slot}
          loading={loading}
        />
      ))}
    </section>
  )
}

ActivityDay.propTypes = {
  activities: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  date: MomentPropTypes.momentObj.isRequired,
}

export default ActivityDay
