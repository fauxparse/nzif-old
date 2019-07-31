import React, { useMemo } from 'react'
import PropTypes from 'lib/proptypes'
import { useClock } from 'lib/hooks'
import moment from 'lib/moment'
import Counter from 'molecules/counter'

const Countdown = ({ to }) => {
  const time = useClock()

  const  deadline = moment(to)

  const [days, hours, minutes, seconds] = useMemo(() => {
    const d = deadline.diff(time, 'days')
    const s = Math.max(0, deadline.clone().subtract(d, 'days').diff(time, 'seconds'))
    return [d, Math.floor(s / 3600), Math.floor(s / 60) % 60, s % 60]
  }, [time, deadline])

  return (
    <Counter>
      <Counter.Group pad={2} digits={days} label="days" />
      <Counter.Text>&nbsp;</Counter.Text>
      <Counter.Group pad={2} digits={hours} label="hours" />
      <Counter.Text>:</Counter.Text>
      <Counter.Group pad={2} digits={minutes} label="minutes" />
      <Counter.Text>:</Counter.Text>
      <Counter.Group pad={2} digits={seconds} label="seconds" />
    </Counter>
  )
}

Countdown.propTypes = {
  to: PropTypes.time.isRequired,
}

export default Countdown
