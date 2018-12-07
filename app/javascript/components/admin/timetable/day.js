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
      startsAt: MomentPropTypes.momentObj.isRequired,
      endsAt: MomentPropTypes.momentObj.isRequired,
    }).isRequired).isRequired,
    selectedId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }

  static contextType = Context

  renderSelection() {
    const { selection: { startsAt, endsAt } = {}, date } = this.props

    if (startsAt && startsAt.isSame(date, 'day')) {
      const { minutesPerSlot } = this.context
      const row = Math.floor(startsAt.diff(date, 'minutes') / minutesPerSlot)
      const height = Math.floor(endsAt.diff(startsAt, 'minutes') / minutesPerSlot)

      return <Selection data-start={row} data-height={height} />
    }
  }

  render() {
    const { date, sessions, selection, selectedId, ...props } = this.props
    const { minutesPerSlot } = this.context

    return (
      <StyledDay {...props}>
        <StyledHeader>
          {date.format('dddd')}
          <small>{date.format('D MMMM')}</small>
        </StyledHeader>
        <StyledTimes />
        <StyledList
          data-day={date.format('YYYY-MM-DD')}
          data-start={date.format()}
        >
          {sessions.map(session => (
            <Block.Placed
              key={session.id}
              draggable
              data-start={session.startsAt.diff(date, 'minutes') / minutesPerSlot}
              data-height={session.endsAt.diff(session.startsAt, 'minutes') / minutesPerSlot}
              data-id={session.id}
            />
          ))}
          {this.renderSelection()}
        </StyledList>
      </StyledDay>
    )
  }
}

export default Day
