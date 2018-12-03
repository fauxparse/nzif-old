import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import moment from '../../../lib/moment'
import { media } from '../../../styles'
import Context from './context'
import Times from './times'
import List from './list'
import Block from './block'

const StyledDay = styled.section`
  flex: 1 0 100vw;
  scroll-snap-align: start;
  display: grid;
  grid-template-rows: 4.5em auto;
  grid-template-columns: 4.5em auto;

  ${media.medium`
    grid-template-columns: auto;
  `}

  ${media.large`
    flex-basis: 12rem;
  `}
`

const StyledHeader = styled.header`${({ theme }) => css`
  grid-row: 1;
  grid-column: 2;
  position: sticky;
  z-index: 1;
  top: 0;
  background: ${theme.colors.background};
  border-bottom: 1px solid ${theme.colors.secondary};
  height: 4.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${media.medium`
    grid-column: 1;
    padding-left: 1em;
  `}

  small {
    display: block;
    font-size: ${theme.fonts.scale(-1)};
    color: ${theme.colors.secondary};
  }
`}`

const StyledTimes = styled(Times)`
  grid-row: 1 / span 2;
  grid-column: 1;

  ${media.medium`
    display: none;
  `}
`

const StyledList = styled(List)`${({ theme }) => css`
  grid-row: 2;
  grid-column: 2;

  ${media.medium`
    grid-column: 1;
    border-left: 1px solid ${theme.colors.border};
  `}
`}`

class Day extends React.Component {
  static propTypes = {
    onResize: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
  }

  static contextType = Context

  selected = (start, end) => {
    const [startTime, endTime] = this.rowsToTimes(start, end)
    this.props.onSelect(startTime, endTime)
  }

  resized = (id, start, end) => {
    const [startTime, endTime] = this.rowsToTimes(start, end)
    this.props.onResize(id, startTime, endTime)
  }

  rowsToTimes = (start, end) => {
    const { date } = this.props
    const { granularity, start: hour } = this.context
    const step = 60 / granularity
    const startTime = date.clone().set('hour', hour).add(start * step, 'minutes')
    const endTime = startTime.clone().add((end - start + 1) * step, 'minutes')
    return [startTime, endTime]
  }

  times() {
    const { date } = this.props
    const { start, end, granularity } = this.context
    const startTime = date.clone().set('hour', start)
    const endTime = startTime.clone().add(end - start, 'hours')
    const range = moment.range(startTime, endTime)
    return Array.from(range.by('hour', { step: 1 / granularity, excludeEnd: true }))
  }

  render() {
    const { date, sessions, onResize, onSelect, ...props } = this.props
    const { start, granularity } = this.context
    const dayStart = date.clone().startOf('day').set('hour', start)
    const minutesPerSlot = 60 / granularity

    return (
      <StyledDay {...props}>
        <StyledHeader>
          {date.format('dddd')}
          <small>{date.format('D MMMM')}</small>
        </StyledHeader>
        <StyledTimes />
        <StyledList
          data-day={date.format('YYYY-MM-DD')}
          data-start={dayStart.format()}
          onSelect={this.selected}
          onResize={this.resized}
        >
          {sessions.map(session => (
            <Block.Placed
              key={session.id}
              draggable
              data-start={session.start.diff(dayStart, 'minutes') / minutesPerSlot}
              data-height={session.end.diff(session.start, 'minutes') / minutesPerSlot}
              data-id={session.id}
            />
          ))}
        </StyledList>
      </StyledDay>
    )
  }
}

export default Day
