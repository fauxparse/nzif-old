import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactRouterPropTypes from 'react-router-prop-types'
import styled from 'styled-components'
import { Switch, Route, withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import sortBy from 'lodash/sortBy'
import pluralize, { singular } from 'pluralize'
import {
  ACTIVITY_QUERY,
} from '../../../queries'
import CommonProps from '../../../lib/proptypes'
import moment from '../../../lib/moment'
import { fullWidth } from '../../../styles'
import Loader from '../../shared/loader'
import { Tab, TabBar } from '../../shared/tabs'
import TextLink from '../../shared/text_link'
import Breadcrumbs from '../../shared/breadcrumbs'
import Name from './name'
import Slug from './slug'
import Overview from './overview'

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

  state = {}

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
    const { activity } = this.state
    const name = e.target.value.replace(/[\r\n]/g, '')
    this.setState({ activity: { ...activity, name } })
  }

  slugChanged = (e) => {
    const { activity } = this.state
    const slug = e.target.value
    this.setState({ activity: { ...activity, slug } })
  }

  renderContent() {
    const { data, location, match } = this.props

    if (data.loading || !this.state.activity) {
      return <Loader />
    } else {
      const { activity } = this.state
      const { sessions } = activity
      const { year } = match.params

      return (
        <>
          <Breadcrumbs back={`/admin/${year}/activities`}>
            <TextLink to={`/admin/${year}/activities`}>{pluralize(activity.type)}</TextLink>
          </Breadcrumbs>
          <Name value={activity.name} onChange={this.nameChanged} />
          <Slug
            root={`${window.location.origin}/${year}/${pluralize(activity.type)}`}
            value={activity.slug}
            onChange={this.slugChanged}
          />
          <TabBar>
            <Tab to={match.url}>
              <span>Overview</span>
            </Tab>
            {sessions.map(session => (
              <Tab to={`${match.url}/${session.id}`} key={session.id}>
                <span>{session.startsAt.format('ddd h:mm A')}</span>
              </Tab>
            ))}
          </TabBar>
          <Switch location={location}>
            <Route exact path={match.url} render={() => <Overview activity={activity} />} />
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
  graphql(ACTIVITY_QUERY, {
    options: ({ match }) => {
      const { year, type, slug } = match.params
      return {
        variables: { year: parseInt(year, 10), type: singular(type), slug },
      }
    },
  })
)(ActivityDetails)
