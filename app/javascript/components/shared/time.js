import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import isArray from 'lodash/isArray'
import moment from '../../lib/moment'

export const TIME_FORMATS = {
  default: 'h:mm A',
}

const ensureTime = t => moment.isMoment(t) ? t : moment(t)

const Time = ({ time, format }) => {
  return (
    <Fragment>
      {(isArray(time) ? time : [time])
        .map(t => ensureTime(t).format(TIME_FORMATS[format]))
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
