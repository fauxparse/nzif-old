import React, { useMemo } from 'react'
import entries from 'lodash/entries'
import groupBy from 'lodash/groupBy'
import sortBy from 'lodash/sortBy'
import PropTypes from 'lib/proptypes'
import moment from 'lib/moment'
import { useSticky } from 'lib/hooks'
import Skeleton from 'effects/skeleton'
import Timeslot from './timeslot'

const Day = ({ date, activities, loading }) => {
  const header = useSticky()

  const day = useMemo(() => moment(date), [date])

  const slots = useMemo(() => (
    sortBy(
      entries(groupBy(activities, activity => activity.startsAt.valueOf())),
      [([time]) => time]
    ).map(([time, activities]) => [moment(parseInt(time, 10)), activities])
  ), [activities])

  return (
    <section className="day">
      <Skeleton
        ref={header}
        as="h2"
        className="day__date"
        loading={loading && false}
        data-long={day.format('dddd D MMMM')}
        data-short={day.format('ddd D MMM')}
        aria-label={day.format('dddd D MMMM')}
      />
      {slots.map(([time, activities]) => (
        <Timeslot
          key={time.valueOf()}
          loading={loading}
          time={time}
          activities={activities}
        />
      ))}
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
