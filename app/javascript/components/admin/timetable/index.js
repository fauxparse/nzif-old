import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router'
import { graphql, compose, withApollo } from 'react-apollo'
import groupBy from 'lodash/groupBy'
import mapValues from 'lodash/mapValues'
import pick from 'lodash/pick'
import moment from '../../../lib/moment'
import {
  TIMETABLE_QUERY,
  CREATE_SESSION_MUTATION,
  UPDATE_SESSION_MUTATION,
  DELETE_SESSION_MUTATION,
} from '../../../queries'
import { media } from '../../../styles'
import Loader from '../../shared/loader'
import { Modal } from '../../modals'
import Context, { DEFAULT_CONTEXT } from './context'
import DragDrop from './drag_drop'
import Grid from './grid'
import NewSession from './new'
import SessionDetails from './session_details'
import Styles from './styles'

const Container = styled.section`
  flex: 1;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  height: calc(100vh - 3.5rem);
`

class Timetable extends Component {
  state = {
    newSession: undefined,
    selected: undefined,
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
        ...pick(variables, ['startsAt', 'endsAt']),
        activity,
      },
      update: this.updateCachedSessions((sessions, { createSession }) =>
        [...sessions, createSession]
      ),
    })
  }

  cancelAdd = () => this.setState({ newSession: undefined })

  resize = ({ id, startsAt, endsAt }) => {
    this.updateSession({
      id,
      startsAt: startsAt.toISOString(),
      endsAt: endsAt.toISOString(),
    })
  }

  updateSession = ({ id, ...attributes }) => {
    const variables = { id, attributes }

    this.props.client.mutate({
      mutation: UPDATE_SESSION_MUTATION,
      variables,
      errorPolicy: 'all',
      update: this.updateCachedSessions((sessions, { updateSession }) =>
        sessions.map(session => session.id === updateSession.id ? {
          ...session,
          ...updateSession,
        } : session)
      ),
    })
  }

  delete = ({ id }) => {
    const variables = { id }

    this.props.client.mutate({
      mutation: DELETE_SESSION_MUTATION,
      variables,
      errorPolicy: 'all',
      optimisticResponse: true,
      update: this.updateCachedSessions((sessions) =>
        sessions.filter(session => session.id !== id)
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

  extractSessions = (sessionData) => (
    [...sessionData, this.state.newSession]
      .filter(Boolean)
      .map(session => ({
        ...session,
        startsAt: moment(session.startsAt),
        endsAt: moment(session.endsAt),
        activity: session.activity && this.activity(session.activity.id),
      }))
      .sort((a, b) => (a.startsAt.valueOf() - b.startsAt.valueOf()) || a.id - b.id)
  )

  selectSession = (session) => this.setState({ selected: session && session.id })

  deselect = () => this.selectSession(undefined)

  duplicate = (session) => {
    this.create(session)
  }

  activity = id => this.props.data.festival.activities.find(activity => activity.id === id)

  renderContent() {
    const { data, history } = this.props
    const { loading, error, festival, activityTypes, sessions: sessionData } = data

    if (loading || error) {
      return <Loader />
    } else {
      const { start } = DEFAULT_CONTEXT
      const startDate = moment(festival.startDate)
      const endDate = moment(festival.endDate)
      const days = Array.from(moment.range(startDate, endDate).by('day'))
        .map(t => t.set('hour', start))
      const sessions = this.extractSessions(sessionData)
      const groupedSessions = groupBy(sessions, session => session.startsAt.dayOfYear())
      const { selected, newSession } = this.state

      return (
        <Context.Provider value={DEFAULT_CONTEXT}>
          <DragDrop onSelect={this.add} onMove={this.resize} onResize={this.resize}>
            {props => (
              <Grid
                days={days}
                sessions={groupedSessions}
                onSessionClick={this.selectSession}
                {...props}
              />
            )}
          </DragDrop>
          <Modal
            isOpen={!!newSession}
            onRequestClose={this.cancelAdd}
            className="modal--autocomplete"
          >
            <NewSession
              {...newSession}
              types={activityTypes}
              activities={festival.activities}
              activityTypes={activityTypes}
              onSubmit={this.create}
              onCancel={this.cancelAdd}
            />
          </Modal>
          <Modal
            isOpen={!!selected}
            onRequestClose={this.deselect}
          >
            <SessionDetails
              session={selected && sessions.find(s => s.id === selected)}
              onDelete={this.delete}
              onDuplicate={this.duplicate}
              onClose={this.deselect}
              onChange={this.updateSession}
              onShowDetails={history.push}
            />
          </Modal>
          <Styles/>
        </Context.Provider>
      )
    }
  }

  render() {
    const { className } = this.props

    return (
      <Container className={className}>
        {this.renderContent()}
      </Container>
    )
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
