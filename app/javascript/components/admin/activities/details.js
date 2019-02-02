import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactRouterPropTypes from 'react-router-prop-types'
import styled from 'styled-components'
import { generatePath } from 'react-router'
import { Switch, Route, withRouter } from 'react-router-dom'
import { graphql, compose, withApollo } from 'react-apollo'
import sortBy from 'lodash/sortBy'
import pluralize, { singular } from 'pluralize'
import {
  ACTIVITY_QUERY,
  UPDATE_ACTIVITY_MUTATION,
} from '../../../queries'
import CommonProps from '../../../lib/proptypes'
import moment from '../../../lib/moment'
import { fullWidth } from '../../../styles'
import Loader from '../../shared/loader'
import { Tab, TabBar } from '../../shared/tabs'
import TextLink from '../../shared/text_link'
import Breadcrumbs from '../../shared/breadcrumbs'
import noTransition from '../../page_transition/none'
import Name from './name'
import Slug from './slug'
import Overview from './overview'
import Session from './session'

const StyledActivityDetails = styled.section`
  ${fullWidth}
`

class ActivityDetails extends Component {
  static propTypes = {
    match: ReactRouterPropTypes.match.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      activity: CommonProps.activity,
    }),
    className: CommonProps.className,
  }

  static defaultProps = {
    loading: true,
    activity: undefined,
  }

  state = {
    slugLoading: false,
    saving: false,
  }

  componentDidUpdate(prevProps) {
    const { data: { activity } } = this.props

    if (activity && (!this.state.activity || activity !== prevProps.data.activity)) {
      this.setState({
        activity: {
          ...activity,
          sessions: sortBy(activity.sessions.map(session => ({
            ...session,
            startsAt: moment(session.startsAt),
            endsAt: moment(session.endsAt),
          })), session => session.startsAt),
        },
      })
    }
  }

  nameChanged = (e) => {
    const name = e.target.value
    if (name !== this.props.data.activity.name) {
      this.updateActivity({ name })
    }
  }

  slugChanged = (e) => {
    const slug = e.target.value
    if (slug !== this.props.data.activity.slug) {
      this.setState({ slugLoading: true })
      this.updateActivity({ slug })
        .then(({ data: { updateActivity } }) => {
          const { history, match: { path } } = this.props
          const [_, year, type, slug] = updateActivity.url.split('/')
          history.replace(generatePath(path, { year, type, slug }), { transition: noTransition })
          this.setState({ slugLoading: false })
        })
    }
  }

  updateActivity = (attributes) => {
    const { activity } = this.props.data
    const { id } = activity
    const variables = { id, attributes }

    this.setState({ saving: true })

    return this.props.client.mutate({
      mutation: UPDATE_ACTIVITY_MUTATION,
      variables,
      errorPolicy: 'all',
    }).then(() => this.setState({ saving: false }))
  }

  renderContent() {
    const { data, location, match } = this.props

    if (data.loading || !this.state.activity) {
      return <Loader />
    } else {
      const { activity, slugLoading, saving } = this.state
      const { sessions } = activity
      const { year } = match.params

      return (
        <>
          <Breadcrumbs back={`/admin/${year}/activities`}>
            <Breadcrumbs.Link to={`/admin/${year}/activities`}>
              {pluralize(activity.type)}
            </Breadcrumbs.Link>
          </Breadcrumbs>
          <Name
            value={activity.name}
            onChange={this.nameChanged}
          />
          <Slug
            root={`${window.location.origin}/${year}/${pluralize(activity.type)}`}
            value={activity.slug}
            loading={slugLoading}
            onChange={this.slugChanged}
          />
          <TabBar>
            <Tab to={match.url}><span>Details</span></Tab>
            {sessions.map(session => (
              <Tab to={`${match.url}/${session.id}`} key={session.id}>
                <span>{session.startsAt.format('ddd h:mm A')}</span>
              </Tab>
            ))}
          </TabBar>
          <Switch location={location}>
            <Route exact path={match.url} render={() => (
              <Overview activity={activity} saving={saving} onChange={this.updateActivity} />
            )} />
            <Route exact path={`${match.url}/:sessionId`} render={({ match }) => (
              <Session
                activity={activity}
                session={sessions.find(session => session.id === match.params.sessionId)}
              />
            )} />
          </Switch>
        </>
      )
    }
  }

  render() {
    const { className } = this.props

    return (
      <StyledActivityDetails className={className}>
        {this.renderContent()}
      </StyledActivityDetails>
    )
  }
}

export default compose(
  withRouter,
  withApollo,
  graphql(ACTIVITY_QUERY, {
    options: ({ match }) => {
      const { year, type, slug } = match.params
      return {
        variables: { year: parseInt(year, 10), type: singular(type), slug },
      }
    },
  })
)(ActivityDetails)
