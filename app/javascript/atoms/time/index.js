import React, { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'
import isArray from 'lodash/isArray'
import moment from 'lib/moment'

export const TIME_FORMATS = {
  default: 'h:mm A',
  short: 'h:mm',
  full: 'h:mm A, dddd D MMMM',
}

const ensureTime = t => moment.isMoment(t) ? t : moment(t)

const Time = ({ time, format }) => {
  const times = useMemo(() => (isArray(time) ? time : [time]).map(ensureTime), [time])

  const split = useMemo(() => (
    times.length > 1 && times[0].format('A') !== times[1].format('A')
  ), [times])

  return (
    <Fragment>
      {times
        .map((t, i) => (
          t.format(TIME_FORMATS[(!split && i < times.length - 1) ? 'short' : format] || format)
        ))
        .join('–')}
    </Fragment>
  )
}

Time.propTypes = {
  time: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]).isRequired),
  ]).isRequired,
  format: PropTypes.string,
}

Time.defaultProps = {
  format: 'default',
}

export default Time
