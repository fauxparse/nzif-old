import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import { UPDATE_SESSION_MUTATION } from '../../../queries'
import CommonProps from '../../../lib/proptypes'
import { IconField } from '../../form'
import VenuePicker from './venue_picker'

class Session extends Component {
  static propTypes = {
    activity: CommonProps.activity,
    session: CommonProps.session,
  }

  static defaultProps = {
  }

  update = (attributes) => {
    const { session } = this.props
    const { id } = session
    const variables = { id, attributes }

    return this.props.client.mutate({
      mutation: UPDATE_SESSION_MUTATION,
      variables,
      errorPolicy: 'all',
    })
  }

  venueChanged = venue => this.update({ venueId: venue.id })

  render() {
    const { session } = this.props

    return (
      <section className="activity-session">
        <IconField icon="venue" label="Venue">
          <VenuePicker value={session.venue} onChange={this.venueChanged} />
        </IconField>
      </section>
    )
  }
}

export default withApollo(Session)
