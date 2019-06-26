import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import isArray from 'lodash/isArray'
import moment from 'lib/moment'

export const DATE_FORMATS = {
  default: 'dddd D MMMM',
  long: 'D MMMM, YYYY',
  sameYear: 'D MMMM',
  sameMonth: 'D',
}

const formatRange = (startDate, endDate) => {
  const result = [endDate.format(DATE_FORMATS.long)]

  if (startDate.isSame(endDate, 'year')) {
    if (startDate.isSame(endDate, 'month') && !startDate.isSame(endDate, 'day')) {
      result.unshift(startDate.format(DATE_FORMATS.sameMonth))
    } else {
      result.unshift(startDate.format(DATE_FORMATS.sameYear))
    }
  } else {
    result.unshift(startDate.format(DATE_FORMATS.default))
  }

  return result.join('–')
}

const Date = ({ date, format }) => {
  const dates = (isArray(date) ? date : [date]).map(d => moment(d))
  if (dates.length > 1 && dates[0].isSame(dates[1], 'day')) dates.pop()

  return (
    <Fragment>
      {dates.length > 1
        ? formatRange(...dates)
        : dates[0].format(DATE_FORMATS[format] || format)}
    </Fragment>
  )
}

Date.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]).isRequired),
  ]).isRequired,
  format: PropTypes.string.isRequired,
}

Date.defaultProps = {
  format: 'default',
}

export default Date
