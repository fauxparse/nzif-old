import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import moment from '../../../lib/moment'
import { media } from '../../../styles'
import Context, { DEFAULT_CONTEXT } from './context'
import Day from './day'
import DragDrop from './drag_drop'
import Times from './times'

const TIMETABLE_QUERY = gql`
  query Timetable($year: Int!) {
    festival(year: $year) {
      startDate
      endDate
    }
  }
`

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

class Timetable extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({ year: PropTypes.string.isRequired }).isRequired
    }).isRequired
  }

  state = {
    sessions: {
      1: {
        id: 1,
        start: moment('2018-10-20T10:00:00.000+1300'),
        end: moment('2018-10-20T13:00:00.000+1300'),
      },
      2: {
        id: 2,
        start: moment('2018-10-20T10:00:00.000+1300'),
        end: moment('2018-10-20T17:00:00.000+1300'),
      },
      3: {
        id: 3,
        start: moment('2018-10-20T14:00:00.000+1300'),
        end: moment('2018-10-20T17:00:00.000+1300'),
      },
    },
  }

  move = ({ id, startTime }) => {
    const { sessions } = this.state
    const session = sessions[id]
    if (session) {
      const length = session.end.diff(session.start, 'minutes')
      session.start = startTime
      session.end = startTime.clone().add(length, 'minutes')
      this.setState({ sessions })
    }
  }

  resize = ({ id, endTime }) => {
    const { sessions } = this.state
    const session = sessions[id]
    if (session) {
      session.end = endTime
      this.setState({ sessions })
    }
  }

  add = ({ startTime: start, endTime: end }) => {
    const sessions = { ...this.state.sessions }
    const session = { id: Date.now(), start, end }
    sessions[session.id] = session
    this.setState({ sessions })
  }

  sessions = (day) => {
    return Object.values(this.state.sessions)
      .filter(session => session.start.isSame(day, 'day'))
      .sort((a, b) => (a.start.valueOf() - b.start.valueOf()) || a.id - b.id)
  }

  render() {
    const { match } = this.props
    const year = parseInt(match.params.year, 10)

    return (
      <Query query={TIMETABLE_QUERY} variables={{ year }}>
        {({ loading, data, error }) => {
          if (loading || error) {
            return <Fragment />
          } else {
            const startDate = moment(data.festival.startDate)
            const endDate = moment(data.festival.endDate)
            const days = Array.from(moment.range(startDate, endDate).by('day'))

            return (
              <Context.Provider value={DEFAULT_CONTEXT}>
                <DragDrop onSelect={this.add} onMove={this.move} onResize={this.resize}>
                  {({ selection, selectedId, ...props }) => (
                    <StyledTimetable {...props}>
                      <StyledTimes />
                      {days.map(day => (
                        <StyledDay
                          key={day.valueOf()}
                          date={day}
                          id={day.format('dddd').toLowerCase()}
                          sessions={this.sessions(day)}
                          selection={selection && selection.startTime.isSame(day, 'day') && selection}
                          selectedId={selectedId}
                        />
                      ))}
                    </StyledTimetable>
                  )}
                </DragDrop>
              </Context.Provider>
            )
          }
        }}
      </Query>
    )
  }
}

export default Timetable
