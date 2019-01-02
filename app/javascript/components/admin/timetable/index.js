import React, { Fragment } from 'react'
import { withRouter } from 'react-router'
import { graphql, compose, withApollo } from 'react-apollo'
import groupBy from 'lodash/groupBy'
import moment from '../../../lib/moment'
import {
  TIMETABLE_QUERY,
  CREATE_SESSION_MUTATION,
  UPDATE_SESSION_MUTATION,
} from '../../../queries'
import { Modal } from '../../modals'
import Context, { DEFAULT_CONTEXT } from './context'
import DragDrop from './drag_drop'
import Grid from './grid'
import NewSessionDialog from './new'
import Styles from './styles'

class Timetable extends React.Component {
  state = {
    newSession: undefined,
  }

  add = ({ startsAt, endsAt }) => {
    this.setState({ newSession: { startsAt, endsAt, id: null } })
  }

  create = ({ startsAt, endsAt, activity }) => {
    const variables = {
      activityId: activity.id,
      startsAt: startsAt.toISOString(),
      endsAt: endsAt.toISOString(),
    }

    this.setState({ newSession: undefined })

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
      .map(session => ({
        ...session,
        startsAt: moment(session.startsAt),
        endsAt: moment(session.endsAt),
        activity: this.activity(session.activityId),
      }))
      .sort((a, b) => (a.startsAt.valueOf() - b.startsAt.valueOf()) || a.id - b.id)
    return groupBy(sessions, session => session.startsAt.dayOfYear())
  }

  activity = id => this.props.data.festival.activities.find(activity => activity.id === id)

  render() {
    const { data } = this.props
    const { loading, error, festival, activityTypes, sessions: sessionData } = data

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
              types={activityTypes}
              activities={festival.activities}
              activityTypes={activityTypes}
              onSubmit={this.create}
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
  withRouter,
  withApollo,
  graphql(TIMETABLE_QUERY, {
    options: props => ({
      variables: { year: parseInt(props.match.params.year, 10) },
    }),
  })
)(Timetable)
