import React from 'react'
import PropTypes from 'prop-types'
import MomentPropTypes from 'react-moment-proptypes'
import styled, { css } from 'styled-components'
import CommonProps from '../../../lib/proptypes'
import { media } from '../../../styles'
import Day from './day'
import Times from './times'

const StyledTimes = styled(Times)`${({ theme }) => css`
  display: none;

  ${media.medium`
    display: block;
    position: sticky;
    left: 0;
    z-index: 2;
    background: ${theme.colors.background}
  `}
`}`

const StyledDay = styled(Day)`
  ${media.medium`
    flex-basis: calc((100vw - 4.5rem) / 3);
    flex-grow: 0;
    flex-shrink: 0;
    grid-template-columns: auto;
  `}

  ${media.large`
    flex-basis: calc((100vw - 4.5rem) / 6);
  `}

  ${media.huge`
    flex-basis: calc((100vw - 4.5rem) / 8);
  `}
`

const Grid = ({ days, sessions, selection, onSessionClick }) => {
  return (
    <>
      <StyledTimes />
      {days.map(day => (
        <StyledDay
          key={day.valueOf()}
          date={day}
          id={day.format('dddd').toLowerCase()}
          sessions={sessions[day.dayOfYear()] || []}
          selection={selection}
          onSessionClick={onSessionClick}
        />
      ))}
    </>
  )
}

Grid.propTypes = {
  days: PropTypes.arrayOf(MomentPropTypes.momentObj.isRequired).isRequired,
  sessions: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape({
    id: CommonProps.id,
    startsAt: MomentPropTypes.momentObj.isRequired,
    endsAt: MomentPropTypes.momentObj.isRequired,
  }).isRequired).isRequired).isRequired,
  selection: PropTypes.shape({
    startsAt: MomentPropTypes.momentObj.isRequired,
    endsAt: MomentPropTypes.momentObj.isRequired,
  }),
  onSessionClick: PropTypes.func.isRequired,
}

Grid.defaultProps = {
  selection: undefined,
}

export default Grid
