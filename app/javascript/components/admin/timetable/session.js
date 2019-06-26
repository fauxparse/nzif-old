import React, { Component } from 'react'
import PropTypes from 'lib/proptypes'
import Block from './block'
import Context from './context'

const startOf = (time, startHour) => time.clone().startOf('day').hour(startHour)

class Session extends Component {
  static propTypes = {
    session: PropTypes.session.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  static defaultProps = {
    id: null,
    activity: null,
  }

  clicked = () => {
    const { session, onClick } = this.props
    onClick(session)
  }

  render() {
    const { session } = this.props
    const { id, activity, startsAt, endsAt } = session

    return (
      <Context.Consumer>
        {({ start, minutesPerSlot }) => (
          <Block
            draggable
            title={activity ? activity.name : undefined}
            data-id={id}
            data-type={activity && activity.type || 'workshop'}
            start={startsAt.diff(startOf(startsAt, start), 'minutes') / minutesPerSlot}
            height={endsAt.diff(startsAt, 'minutes') / minutesPerSlot}
            onClick={this.clicked}
          >
            {activity && <div className="timetable__activity-name">{activity.name}</div>}
          </Block>
        )}
      </Context.Consumer>
    )
  }
}


export default Session
