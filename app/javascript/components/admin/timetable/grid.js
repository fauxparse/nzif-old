import React from 'react'
import PropTypes from 'lib/proptypes'
import MomentPropTypes from 'react-moment-proptypes'
import classNames from 'classnames'
import Day from './day'
import Times from './times'

const Grid = ({ className, days, sessions, selection, selectedId, onSessionClick, ...props }) => {
  return (
    <div className={classNames('timetable__grid', className)} {...props}>
      <Times />
      {days.map(day => (
        <Day
          key={day.valueOf()}
          date={day}
          id={day.format('dddd').toLowerCase()}
          sessions={sessions[day.dayOfYear()] || []}
          selection={selection}
          onSessionClick={onSessionClick}
        />
      ))}
    </div>
  )
}

Grid.propTypes = {
  className: PropTypes.className,
  days: PropTypes.arrayOf(MomentPropTypes.momentObj.isRequired).isRequired,
  sessions: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.id,
    startsAt: MomentPropTypes.momentObj.isRequired,
    endsAt: MomentPropTypes.momentObj.isRequired,
  }).isRequired).isRequired).isRequired,
  selection: PropTypes.shape({
    startsAt: MomentPropTypes.momentObj.isRequired,
    endsAt: MomentPropTypes.momentObj.isRequired,
  }),
  selectedId: PropTypes.id,
  onSessionClick: PropTypes.func.isRequired,
}

Grid.defaultProps = {
  selection: undefined,
}

export default Grid
