import React from 'react'
import PropTypes from 'prop-types'
import ReactRouterPropTypes from 'react-router-prop-types'
import MomentPropTypes from 'react-moment-proptypes'
import styled, { css } from 'styled-components'
import { compose, withApollo } from 'react-apollo'
import { withRouter } from 'react-router'
import deburr from 'lodash/deburr'
import upperFirst from 'lodash/upperFirst'
import {
  TIMETABLE_QUERY,
  CREATE_ACTIVITY_MUTATION,
} from '../../../queries'
import Icon from '../../icons'
import Autocomplete, { Highlight } from '../../autocomplete'

const StyledIcon = styled(Icon)`${({ theme }) => css`
  flex: 0 0 auto;
  margin-right: 1rem;
  color: ${theme.colors.secondary};
`}`

const StyledDetails = styled.div`
  flex: 1;
`

const StyledDescription = styled.span`${({ theme }) => css`
  color: ${theme.colors.secondary};
`}`

const StyledHighlight = styled(Highlight)`${({ theme }) => css`
  font-size: ${theme.fonts.scale(1)};
  line-height: 1.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`}`

const StyledMenuItem = styled.li`${({ theme }) => css`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0.5rem 1rem;

  &[aria-selected] {
    background: ${theme.colors.accent};
    color: ${theme.colors.white};
  }
`}`

const MenuItem = ({ label, selected, selectedText, value: { id, type }, ...props }) => (
  <StyledMenuItem aria-selected={selected || undefined} {...props}>
    <StyledIcon name={id ? type : 'add'} />
    <StyledDetails>
      <StyledHighlight text={label} prefix={selectedText} />
      <StyledDescription>{id ? upperFirst(type) : `New ${type}`}</StyledDescription>
    </StyledDetails>
  </StyledMenuItem>
)

MenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  selectedText: PropTypes.string.isRequired,
  value: PropTypes.shape({ type: PropTypes.string.isRequired }).isRequired,
}

const StyledNewSession = styled.section`
  ul {
    margin: 0.5em 0;
  }
`

class NewSession extends React.Component {
  static propTypes = {
    activities: PropTypes.array.isRequired,
    activityTypes: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    startsAt: MomentPropTypes.momentObj,
    endsAt: MomentPropTypes.momentObj,
    match: ReactRouterPropTypes.match.isRequired,
    client: PropTypes.any.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  }

  submit = ({ value: activity }) => {
    if (activity.id) {
      this.createSession(activity)
    } else {
      const { match } = this.props
      const year = parseInt(match.params.year, 10)
      this.createActivity(year, activity.type, activity.name)
    }
  }

  createActivity = (year, type, name) => {
    const { client } = this.props
    const variables = {
      year,
      type,
      attributes: {
        name,
      },
    }

    client.mutate({
      mutation: CREATE_ACTIVITY_MUTATION,
      variables,
      errorPolicy: 'all',
      update: (cache, { data: { createActivity: activity } }) => {
        const { festival, ...rest } = cache.readQuery({
          query: TIMETABLE_QUERY,
          variables: { year },
        })
        festival.activities.push(activity)
        cache.writeQuery({
          query: TIMETABLE_QUERY,
          variables: { year },
          data: { festival, ...rest },
        })

        this.createSession(activity)
      },
    })
  }

  createSession = (activity) => {
    const { startsAt, endsAt, onSubmit } = this.props
    onSubmit({
      startsAt,
      endsAt,
      activity,
    })
  }

  search = (text, options) => {
    if (text) {
      const expression = new RegExp(`^${deburr(text)}`, 'i')
      return [
        ...options.filter(({ label }) => deburr(label).match(expression)),
        ...this.newActivities(text),
      ]
    } else {
      return []
    }
  }

  newActivities = (name) => {
    const { activityTypes } = this.props

    if (!this._newActivities) {
      this._newActivities = activityTypes.map(type => ({
        label: name,
        value: { type, name },
      }))
    }

    this._newActivities.forEach(option => {
      option.label = option.value.name = name
    })
    return this._newActivities
  }

  render() {
    const { activities } = this.props

    return (
      <StyledNewSession>
        <Autocomplete
          options={activities.map(a => ({ id: a.id, label: a.name, value: a }))}
          placeholder="Type activity name…"
          menuItemComponent={MenuItem}
          search={this.search}
          onChange={this.submit}
        />
      </StyledNewSession>
    )
  }
}

export default compose(withRouter, withApollo)(NewSession)
