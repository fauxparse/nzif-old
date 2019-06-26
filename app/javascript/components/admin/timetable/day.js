import React from 'react'
import MomentPropTypes from 'react-moment-proptypes'
import classNames from 'classnames'
import PropTypes from 'lib/proptypes'
import Context from './context'
import Times from './times'
import List from './list'
import Block from './block'
import Session from './session'

class Day extends React.Component {
  static propTypes = {
    date: MomentPropTypes.momentObj.isRequired,
    selection: PropTypes.session,
    sessions: PropTypes.arrayOf(PropTypes.session.isRequired).isRequired,
    selectedId: PropTypes.id,
    onSessionClick: PropTypes.func.isRequired,
  }

  static defaultProps = {
    selection: undefined,
  }

  static contextType = Context

  renderSelection() {
    const { selection: { id, startsAt, endsAt } = {}, date } = this.props

    if (!id && startsAt && startsAt.isSame(date, 'day')) {
      const { minutesPerSlot } = this.context
      const row = Math.floor(startsAt.diff(date, 'minutes') / minutesPerSlot)
      const height = Math.floor(endsAt.diff(startsAt, 'minutes') / minutesPerSlot)

      return (
        <Block
          className="timetable__block--selecting"
          start={row}
          height={height}
        />
      )
    }
  }

  render() {
    const { className, date, sessions, selection, onSessionClick, ...props } = this.props

    return (
      <div className={classNames('timetable__day', className)} {...props}>
        <header className="timetable__header">
          {date.format('dddd')}
          <small>{date.format('D MMMM')}</small>
        </header>
        <Times />
        <List
          data-day={date.format('YYYY-MM-DD')}
          data-start={date.format()}
        >
          {sessions.map(session => (
            <Session
              key={session.id}
              session={session}
              onClick={onSessionClick}
            />
          ))}
          {this.renderSelection()}
        </List>
      </div>
    )
  }
}

export default Day
