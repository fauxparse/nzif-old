import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { graphql, compose, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import groupBy from 'lodash/groupBy'
import moment from '../../../lib/moment'
import { media } from '../../../styles'
import Context, { DEFAULT_CONTEXT } from './context'
import Day from './day'
import DragDrop from './drag_drop'
import Times from './times'

const TIMETABLE_QUERY = gql`
  query Timetable($year: Int!) {
    festival(year: $year) {
      year
      startDate
      endDate

      activities {
        id
        name
        type
      }
    }

    sessions(year: $year) {
      id
      startsAt
      endsAt
      activityId
    }
  }
`

const CREATE_SESSION_MUTATION = gql`
  mutation CreateSession($activityId: ID!, $startsAt: Time!, $endsAt: Time!) {
    createSession(activityId: $activityId, startsAt: $startsAt, endsAt: $endsAt) {
      id
      activityId
      startsAt
      endsAt
    }
  }
`

const UPDATE_SESSION_MUTATION = gql`
  mutation UpdateSession($id: ID!, $startsAt: Time!, $endsAt: Time!) {
    updateSession(id: $id, startsAt: $startsAt, endsAt: $endsAt) {
      id
      activityId
      startsAt
      endsAt
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

  add = ({ startsAt, endsAt }) => {
    const activityId = this.props.data.festival.activities[0].id
    const variables = {
      activityId,
      startsAt: startsAt.toISOString(),
      endsAt: endsAt.toISOString(),
    }

    this.props.client.mutate({
      mutation: CREATE_SESSION_MUTATION,
      variables,
      errorPolicy: 'all',
      optimisticReponse: {
        id: -1,
        ...variables,
      },
      update: this.updateCachedSessions((sessions, { createSession }) =>
        [...sessions, createSession]
      ),
    })
  }

  update = ({ id, startsAt, endsAt }) => {
    const variables = {
      id,
      startsAt: startsAt.toISOString(),
      endsAt: endsAt.toISOString(),
    }

    this.props.client.mutate({
      mutation: UPDATE_SESSION_MUTATION,
      variables,
      errorPolicy: 'all',
      optimisticReponse: variables,
      update: this.updateCachedSessions((sessions, { updateSession }) =>
        sessions.map(session => session.id === updateSession.id ? {
          ...session,
          ...updateSession,
        } : session)
      ),
    })
  }

  updateCachedSessions = callback => (cache, { data }) => {
    const year = parseInt(this.props.match.params.year, 10)
    const { sessions, ...rest } = cache.readQuery({
      query: TIMETABLE_QUERY,
      variables: { year },
    })

    const newSessions = callback(sessions, data)

    cache.writeQuery({
      query: TIMETABLE_QUERY,
      variables: { year },
      data: { sessions: newSessions, ...rest },
    })
  }

  extractSessions = (sessionData) => {
    const sessions = sessionData
      .map(s => ({ ...s, startsAt: moment(s.startsAt), endsAt: moment(s.endsAt) }))
      .sort((a, b) => (a.startsAt.valueOf() - b.startsAt.valueOf()) || a.id - b.id)
    return groupBy(sessions, session => session.startsAt.dayOfYear())
  }

  render() {
    const { loading, error, festival, sessions: sessionData } = this.props.data

    if (loading || error) {
      return <Fragment />
    } else {
      const { start } = DEFAULT_CONTEXT
      const startDate = moment(festival.startDate)
      const endDate = moment(festival.endDate)
      const days = Array.from(moment.range(startDate, endDate).by('day'))
        .map(t => t.set('hour', start))
      const sessions = this.extractSessions(sessionData)

      return (
        <Context.Provider value={DEFAULT_CONTEXT}>
          <DragDrop onSelect={this.add} onMove={this.update} onResize={this.update}>
            {({ selection, selectedId, ...props }) => (
              <StyledTimetable {...props}>
                <StyledTimes />
                {days.map(day => (
                  <StyledDay
                    key={day.valueOf()}
                    date={day}
                    id={day.format('dddd').toLowerCase()}
                    sessions={sessions[day.dayOfYear()] || []}
                    selection={selection}
                    selectedId={selectedId}
                  />
                ))}
              </StyledTimetable>
            )}
          </DragDrop>
        </Context.Provider>
      )
    }
  }
}

export default compose(
  withApollo,
  graphql(TIMETABLE_QUERY, {
    options: props => ({
      variables: { year: parseInt(props.match.params.year, 10) },
    }),
  })
)(Timetable)
