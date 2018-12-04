import React from 'react'
import PropTypes from 'prop-types'
import MomentPropTypes from 'react-moment-proptypes'
import styled, { css } from 'styled-components'
import { media } from '../../../styles'
import Context from './context'
import Times from './times'
import List from './list'
import Block from './block'

const StyledDay = styled.div`
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

const Selection = styled(Block.Placed)`
  background-color: rgba(255, 255, 255, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.75);
`

class Day extends React.Component {
  static propTypes = {
    date: MomentPropTypes.momentObj.isRequired,
    selection: PropTypes.shape({
      start: PropTypes.number.isRequired,
      end: PropTypes.number.isRequired,
    }),
    sessions: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      start: MomentPropTypes.momentObj.isRequired,
      end: MomentPropTypes.momentObj.isRequired,
    }).isRequired).isRequired,
    selectedId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }

  static contextType = Context

  render() {
    const { date, sessions, selection, selectedId, ...props } = this.props
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
        >
          {sessions.map(session => (
            <Block.Placed
              key={session.id}
              draggable
              data-start={session.start.diff(dayStart, 'minutes') / minutesPerSlot}
              data-height={session.end.diff(session.start, 'minutes') / minutesPerSlot}
              data-id={session.id}
              aria-grabbed={session.id == selectedId || null}
            />
          ))}
          {selection && (
            <Selection
              data-start={selection.start}
              data-height={selection.end - selection.start + 1}
            />
          )}
        </StyledList>
      </StyledDay>
    )
  }
}

export default Day
