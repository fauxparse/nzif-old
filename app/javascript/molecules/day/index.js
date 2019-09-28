import React, { useMemo } from 'react'
import PropTypes from 'lib/proptypes'
import moment from 'lib/moment'
import { useSticky } from 'lib/hooks'
import Skeleton from 'effects/skeleton'

import './index.scss'

const Day = ({ date, type, loading, offset, children }) => {
  const options = useMemo(() => ({ stickyBitStickyOffset: offset }), [offset])

  const header = useSticky(options)

  const day = useMemo(() => moment(date), [date])

  return (
    <section className="day" data-type={type}>
      <Skeleton
        ref={header}
        as="h2"
        className="day__date"
        loading={loading && false}
        data-long={day.format('dddd D MMMM')}
        data-short={day.format('ddd D MMM')}
        aria-label={day.format('dddd D MMMM')}
      />
      {children}
    </section>
  )
}

Day.propTypes = {
  date: PropTypes.time.isRequired,
  loading: PropTypes.bool,
  offset: PropTypes.number,
  type: PropTypes.string,
}

Day.defaultProps = {
  loading: false,
  offset: 0,
  type: 'workshop',
}

export default Day
