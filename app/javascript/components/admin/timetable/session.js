import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MomentPropTypes from 'react-moment-proptypes'
import styled, { css } from 'styled-components'
import CommonProps from '../../../lib/proptypes'
import Block from './block'
import Context from './context'

const themeBlock = (type, base) => css`
  &[data-type="${type}"] {
    background: linear-gradient(to bottom, ${base[200]}, ${base[300]});
    border-color: ${base[500]};
    color: ${base[700]};
  }
`

const Activity = styled.div`${({ theme }) => css`
  font-size: ${theme.fonts.scale(-1)};
  padding: 0 0.5em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
`}`

const StyledSession = styled(Block.Placed)`${({ theme }) => css`
  ${themeBlock('workshop', theme.colors.plum)}
  ${themeBlock('show', theme.colors.grape)}
`}`

const startOf = (time, startHour) => time.clone().startOf('day').hour(startHour)

class Session extends Component {
  static propTypes = {
    session: CommonProps.session.isRequired,
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
    const { session, onClick } = this.props
    const { id, activity, startsAt, endsAt } = session

    return (
      <Context.Consumer>
        {({ start, minutesPerSlot }) => (
          <StyledSession
            draggable
            title={activity ? activity.name : undefined}
            data-id={id}
            data-type={activity && activity.type || 'workshop'}
            data-start={startsAt.diff(startOf(startsAt, start), 'minutes') / minutesPerSlot}
            data-height={endsAt.diff(startsAt, 'minutes') / minutesPerSlot}
            onClick={this.clicked}
          >
            {activity && <Activity>{activity.name}</Activity>}
          </StyledSession>
        )}
      </Context.Consumer>
    )
  }
}


export default Session
