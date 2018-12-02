import React from 'react'
import styled, { css } from 'styled-components'
import moment from '../../../lib/moment'
import { media } from '../../../styles'
import Day from './day'
import Times from './times'

const StyledTimetable = styled.section`
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

const StyledDay = styled(Day)`${({ theme }) => css`
  ${media.medium`
    flex-basis: calc((100vw - 4.5rem) / 3);
    grid-template-columns: auto;
    border-left: 1px solid ${theme.colors.border};
  `}

  ${media.large`
    flex-basis: calc((100vw - 4.5rem) / 6);
  `}

  ${media.huge`
    flex-basis: calc((100vw - 4.5rem) / 8);
  `}
`}`

class Timetable extends React.Component {
  render() {
    const days = Array(8).fill(0).map((_, i) => moment().startOf('day').add(i, 'days'))
    return (
      <StyledTimetable>
        <StyledTimes />
        {days.map(day => (
          <StyledDay key={day.valueOf()} date={day} />
        ))}
      </StyledTimetable>
    )
  }
}

export default Timetable
