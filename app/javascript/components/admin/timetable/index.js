import React, { Fragment } from 'react'
import { graphql, compose, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import groupBy from 'lodash/groupBy'
import moment from '../../../lib/moment'
import { Modal } from '../../modals'
import Context, { DEFAULT_CONTEXT } from './context'
import DragDrop from './drag_drop'
import Grid from './grid'
import NewSessionDialog from './new'
import Styles from './styles'

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

// const CREATE_SESSION_MUTATION = gql`
//   mutation CreateSession($activityId: ID!, $startsAt: Time!, $endsAt: Time!) {
//     createSession(activityId: $activityId, startsAt: $startsAt, endsAt: $endsAt) {
//       id
//       activityId
//       startsAt
//       endsAt
//     }
//   }
// `

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

class Timetable extends React.Component {
  state = {
    newSession: undefined,
  }

  add = ({ startsAt, endsAt }) => {
    this.setState({ newSession: { startsAt, endsAt, id: 1000000 } })

    // const activityId = this.props.data.festival.activities[0].id
    // const variables = {
    //   activityId,
    //   startsAt: startsAt.toISOString(),
    //   endsAt: endsAt.toISOString(),
    // }

    // this.props.client.mutate({
    //   mutation: CREATE_SESSION_MUTATION,
    //   variables,
    //   errorPolicy: 'all',
    //   optimisticReponse: {
    //     id: -1,
    //     ...variables,
    //   },
    //   update: this.updateCachedSessions((sessions, { createSession }) =>
    //     [...sessions, createSession]
    //   ),
    // })
  }

  cancelAdd = () => this.setState({ newSession: undefined })

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
    const { newSession } = this.state
    const sessions = [...sessionData, newSession]
      .filter(Boolean)
      .map(s => ({ ...s, startsAt: moment(s.startsAt), endsAt: moment(s.endsAt) }))
      .sort((a, b) => (a.startsAt.valueOf() - b.startsAt.valueOf()) || a.id - b.id)
    return groupBy(sessions, session => session.startsAt.dayOfYear())
  }

  render() {
    const { data } = this.props
    const { loading, error, festival, sessions: sessionData } = data

    if (loading || error) {
      return <Fragment />
    } else {
      const { start } = DEFAULT_CONTEXT
      const startDate = moment(festival.startDate)
      const endDate = moment(festival.endDate)
      const days = Array.from(moment.range(startDate, endDate).by('day'))
        .map(t => t.set('hour', start))
      const sessions = this.extractSessions(sessionData)
      const { newSession } = this.state

      return (
        <Context.Provider value={DEFAULT_CONTEXT}>
          <DragDrop onSelect={this.add} onMove={this.update} onResize={this.update}>
            {props => (
              <Grid
                days={days}
                sessions={sessions}
                {...props}
              />
            )}
          </DragDrop>
          <Modal
            isOpen={!!newSession}
            onRequestClose={this.cancelAdd}
            className="new-session"
          >
            <NewSessionDialog
              {...newSession}
              activities={festival.activities}
              onSubmit={() => {}}
              onCancel={this.cancelAdd}
            />
          </Modal>
          <Styles/>
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
