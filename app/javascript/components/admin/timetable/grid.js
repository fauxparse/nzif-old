import React from 'react'
import PropTypes from 'prop-types'
import MomentPropTypes from 'react-moment-proptypes'
import styled, { css } from 'styled-components'
import { media } from '../../../styles'
import Day from './day'
import Times from './times'

const StyledGrid = styled.section`
  flex: 1;
  display: flex;
  align-items: flex-start;
  height: calc(100vh - 3.5rem);
  overflow: auto;
  scroll-snap-type: x mandatory;

  ${media.medium`
    scroll-padding: 0 0 0 4.5em;
  `}
`

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
    grid-template-columns: auto;
  `}

  ${media.large`
    flex-basis: calc((100vw - 4.5rem) / 6);
  `}

  ${media.huge`
    flex-basis: calc((100vw - 4.5rem) / 8);
  `}
`

const Grid = ({ days, sessions, selection, selectedId, ...props }) => {
  return (
    <StyledGrid {...props}>
      <StyledTimes />
      {days.map(day => (
        <StyledDay
          key={day.valueOf()}
          date={day}
          id={day.format('dddd').toLowerCase()}
          sessions={sessions[day.dayOfYear()] || []}
          selection={selection}
        />
      ))}
    </StyledGrid>
  )
}

Grid.propTypes = {
  days: PropTypes.arrayOf(MomentPropTypes.momentObj.isRequired).isRequired,
  sessions: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.string.isRequired]),
    startsAt: MomentPropTypes.momentObj.isRequired,
    endsAt: MomentPropTypes.momentObj.isRequired,
  }).isRequired).isRequired).isRequired,
  selection: PropTypes.shape({
    startsAt: MomentPropTypes.momentObj.isRequired,
    endsAt: MomentPropTypes.momentObj.isRequired,
  }),
}

Grid.defaultProps = {
  selection: undefined,
}

export default Grid
