import React from 'react'
import PropTypes from 'prop-types'
import MomentPropTypes from 'react-moment-proptypes'
import styled, { css } from 'styled-components'
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

const Session = ({ id, activity, startsAt, endsAt }) => (
  <Context.Consumer>
    {({ start, minutesPerSlot }) => (
      <StyledSession
        draggable
        title={activity.name}
        data-id={id}
        data-type={activity.type || 'workshop'}
        data-start={startsAt.diff(startOf(startsAt, start), 'minutes') / minutesPerSlot}
        data-height={endsAt.diff(startsAt, 'minutes') / minutesPerSlot}
      >
        <Activity>{activity.name}</Activity>
      </StyledSession>
    )}
  </Context.Consumer>
)

Session.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  activity: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    type: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  startsAt: MomentPropTypes.momentObj.isRequired,
  endsAt: MomentPropTypes.momentObj.isRequired,
}

export default Session
