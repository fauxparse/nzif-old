import React from 'react'
import PropTypes from 'prop-types'
import ReactRouterPropTypes from 'react-router-prop-types'
import MomentPropTypes from 'react-moment-proptypes'
import { compose, withApollo } from 'react-apollo'
import { withRouter } from 'react-router'
import deburr from 'lodash/deburr'
import upperFirst from 'lodash/upperFirst'
import Highlighter from 'react-highlight-words'
import {
  TIMETABLE_QUERY,
  CREATE_ACTIVITY_MUTATION,
} from '../../../queries'
import Icon from '../../icons'
import Autocomplete from '../../autocomplete'

const MenuItem = ({ label, selected, selectedText, value: { id, type }, ...props }) => (
  <li className="new-session__menu-item" aria-selected={selected || undefined} {...props}>
    <Icon name={id ? type : 'add'} />
    <div className="new-session__activity-details">
      <Highlighter
        className="highlight"
        textToHighlight={label}
        searchWords={selectedText.split(/\s+/)}
        sanitize={deburr}
      />
      <span className="new-session__activity-description">
        {id ? upperFirst(type) : `New ${type}`}
      </span>
    </div>
  </li>
)

MenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  selectedText: PropTypes.string.isRequired,
  value: PropTypes.shape({ type: PropTypes.string.isRequired }).isRequired,
}

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
      const re = new RegExp(deburr(text).trim().split(/\s+/).map(w => `(?=.*${w})`).join(''), 'i')
      return [
        ...options.filter(({ label }) => deburr(label).match(re)),
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
      <section className="new-session">
        <Autocomplete
          options={activities.map(a => ({ id: a.id, label: a.name, value: a }))}
          placeholder="Type activity name…"
          menuItemComponent={MenuItem}
          search={this.search}
          onChange={this.submit}
        />
      </section>
    )
  }
}

export default compose(withRouter, withApollo)(NewSession)
