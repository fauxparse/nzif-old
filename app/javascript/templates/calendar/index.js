import React, {  useCallback, useMemo, useRef, useState } from 'react'
import PropTypes from 'lib/proptypes'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import moment from 'lib/moment'
import groupBy from 'lodash/groupBy'
import times from 'lodash/times'
import Button from 'atoms/button'
import Loader from 'atoms/loader'
import Date from 'atoms/date'
import Skeleton from 'effects/skeleton'
import Day from './day'
import Details from './details'

import './index.scss'

const Calendar = ({ loading, festival, sessions }) => {
  const scrollableArea = useRef()

  const timeColumn = useRef()

  const dateRow = useRef()

  const today = useMemo(moment)

  const dates = useMemo(() => {
    if (!festival.startDate) {
      return times(5, i => moment().startOf('day').add(i + 1, 'days'))
    } else {
      const start = moment(festival.startDate)
      const end = moment(festival.endDate)
      return times(end.diff(start, 'days') + 1, i => start.clone().add(i, 'days'))
    }
  }, [festival])

  const hours = useMemo(() => times(25 - 9, (h) => moment().startOf('day').hour(h + 9)), [])

  const ticking = useRef(false)

  const scrollPosition = useRef([0, 0])

  const repaint = useCallback(() => {
    const [left, top] = scrollPosition.current
    timeColumn.current.style.transform = `translateY(${-top}px)`
    dateRow.current.style.transform = `translateX(${-left}px)`
    ticking.current = false
  }, [scrollPosition, ticking, timeColumn, dateRow])

  const scrolled = useCallback(() => {
    scrollPosition.current = [scrollableArea.current.scrollLeft, scrollableArea.current.scrollTop]

    if (!ticking.current) {
      requestAnimationFrame(repaint)
      ticking.current = true
    }
  }, [repaint])

  const sessionsByDay = useMemo(() => (
    groupBy(sessions, group => group[0].startsAt.clone().startOf('day').valueOf())
  ), [sessions])

  const [selected, setSelected] = useState(null)

  const showDetails = setSelected

  const hideDetails = useCallback(() => setSelected(null), [setSelected])

  return (
    <section className="calendar">
      <header className="calendar__header">
        <Button
          as={Link}
          to={`/${festival.year}`}
          icon="arrow-left"
          className="calendar__back"
        />
        <div className="calendar__dates">
          <div className="inner" ref={dateRow}>
            {dates.map(date => (
              <Skeleton
                loading={loading}
                key={date.valueOf()}
                className={classNames('calendar__date', date.isSame(today, 'day') && 'calendar__date--today')}
              >
                <span className="date__weekday"><Date date={date} format="dddd" /></span>
                <span className="date__day"><Date date={date} format="D MMMM" /></span>
              </Skeleton>
            ))}
          </div>
        </div>
      </header>
      <div className="calendar__body">
        <div className="calendar__times">
          <div className="inner" ref={timeColumn}>
            {hours.map(t => (
              <div key={t.hour()} className="calendar__time">
                <span className="time">{t.format('h A')}</span>
              </div>
            ))}
          </div>
        </div>
        <div ref={scrollableArea} className="calendar__scrollable-area" onScroll={scrolled}>
          {loading && <Loader />}
          {dates.map(date => (
            <Day
              key={date.valueOf()}
              date={date}
              today={date.isSame(today, 'day')}
              sessions={sessionsByDay[date.valueOf()] || []}
              onSessionClicked={showDetails}
            />
          ))}
        </div>
      </div>
      <Details session={selected} onClose={hideDetails} />
    </section>
  )
}

Calendar.propTypes = {
  loading: PropTypes.bool,
  festival: PropTypes.festival.isRequired,
  sessions: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.session.isRequired).isRequired),
}

Calendar.defaultProps = {
  loading: false,
}

export default Calendar
