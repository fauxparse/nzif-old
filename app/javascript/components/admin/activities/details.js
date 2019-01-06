import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import ReactRouterPropTypes from 'react-router-prop-types'
import styled, { css } from 'styled-components'
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import sortBy from 'lodash/sortBy'
import { singular } from 'pluralize'
import {
  ACTIVITY_QUERY,
} from '../../../queries'
import CommonProps from '../../../lib/proptypes'
import { fullWidth } from '../../../styles'
import Loader from '../../shared/loader'
import { Tab, TabBar } from '../../shared/tabs'

const StyledActivityDetails = styled.section`${({ theme }) => css`
  ${fullWidth}
`}`

class ActivityDetails extends Component {
  static propTypes = {
    match: ReactRouterPropTypes.match.isRequired,
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

  static getDerivedStateFromProps = ({ data: { activity } = {} }) => {
    return activity
      ? {
          activity: {
            ...activity,
            sessions: sortBy(activity.sessions.map(session => ({
              ...session,
              startsAt: moment(session.startsAt),
              endsAt: moment(session.endsAt),
            })), session => session.startsAt),
          }
        }
      : {}
  }

  state = {}

  render() {
    const { data, match, className } = this.props

    if (data.loading) {
      return <Loader />
    } else {
      const { activity } = this.state
      const { sessions } = activity

      return (
        <StyledActivityDetails className={className}>
          <h1>{activity.name}</h1>
          <TabBar>
            <Tab to={match.url}>
              <span>Overview</span>
            </Tab>
            {sessions.map(session => (
              <Tab to={`${match.url}/${session.id}`} key={session.id}>
                <span>{session.startsAt.format('dddd h:mm A')}</span>
              </Tab>
            ))}
          </TabBar>
        </StyledActivityDetails>
      )
    }
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
