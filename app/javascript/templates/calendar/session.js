import React, { useCallback, useMemo } from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import pluralize from 'pluralize'
import humanize from 'lib/humanize'
import Time from 'atoms/time'

const Session = ({ group, onClick }) => {
  const selected = useMemo(() => group.activities.find(s => s.selected), [group])

  const clicked = useCallback(() => {
    onClick(group)
  }, [group, onClick])

  return (
    <div
      className={classNames('calendar__group', selected && 'calendar__group--selected')}
      style={{
        gridRowStart: group.startRow,
        gridRowEnd: group.endRow,
      }}
    >
      <div className="calendar__session" data-type={group.type} onClick={clicked}>
        <span className="session__name">
          {selected ? selected.name : pluralize(humanize(group.type))}
        </span>
        {' '}
        <span className="session__times">
          <Time time={[group.startsAt, group.endsAt]} />
        </span>
      </div>
    </div>
  )
}

Session.propTypes = {
  group: PropTypes.shape({
    startsAt: PropTypes.time.isRequired,
    endsAt: PropTypes.time.isRequired,
    startRow: PropTypes.number.isRequired,
    endRow: PropTypes.number.isRequired,
    type: PropTypes.activityType.isRequired,
    activities: PropTypes.arrayOf(PropTypes.activity.isRequired).isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Session
