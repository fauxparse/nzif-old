import React, { useEffect, useMemo, useRef, useState } from 'react'
import MomentPropTypes from 'react-moment-proptypes'
import PropTypes from 'lib/proptypes'
import moment from 'lib/moment'
import Digit from './digit'

const NumberGroup = ({ number, label = '', digits = 2 }) => {
  const d = useMemo(
    () =>
      Array(digits)
      .fill(0)
      .map((_, i) => Math.floor((number / Math.pow(10, i)) % 10))
      .reverse(),
    [number, digits]
  )
  return (
    <div className="countdown__group">
      <div className="digits countdown__digits">
        {d.map((n, i) => <Digit key={i} number={n} />)}
      </div>
      <div className="countdown__label">
        {label}
      </div>
    </div>
  )
}

NumberGroup.propTypes = {
  number: PropTypes.number.isRequired,
  label: PropTypes.string,
  digits: PropTypes.number,
}

const Countdown = ({ to }) => {
  const [currentTime, setCurrentTime] = useState(moment())

  const time = useMemo(() => moment(to), [to])

  const timer = useRef()

  useEffect(() => {
    timer.current = setInterval(() => setCurrentTime(moment()), 1000)
    return () => clearInterval(timer.current)
  }, [setCurrentTime])

  const [days, hours, minutes, seconds] = useMemo(() => {
    const d = time.diff(currentTime, 'days')
    const s = time.clone().subtract(d, 'days').diff(currentTime, 'seconds')
    return [d, Math.floor(s / 3600), Math.floor(s / 60) % 60, s % 60]
  }, [time, currentTime])


  return (
    <div className="countdown">
      <NumberGroup number={days} label="days" />
      <span className="countdown__separator">{' '}</span>
      <NumberGroup number={hours} label="hours" />
      <span className="countdown__separator">{':'}</span>
      <NumberGroup number={minutes} label="mins" />
      <span className="countdown__separator">{':'}</span>
      <NumberGroup number={seconds} label="secs" />
    </div>
  )
}

Countdown.propTypes = {
  to: PropTypes.oneOfType([
    MomentPropTypes.momentObj.isRequired,
    PropTypes.string.isRequired,
  ]),
}

export default Countdown
