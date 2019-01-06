import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import ReactRouterPropTypes from 'react-router-prop-types'
import styled, { css } from 'styled-components'
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import { singular } from 'pluralize'
import {
  ACTIVITY_QUERY,
} from '../../../queries'
import CommonProps from '../../../lib/proptypes'
import Loader from '../../shared/loader'

const StyledActivityDetails = styled.section`${({ theme }) => css`

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
    return activity ? { activity } : {}
  }

  state = {}

  render() {
    const { data: { loading }, match, className } = this.props
    const { slug } = match.params
    const { activity } = this.state

    return (
      <section className={className}>
        {loading
          ? <Loader />
          : (
              <h1>{activity.name}</h1>
            )
        }
      </section>
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
