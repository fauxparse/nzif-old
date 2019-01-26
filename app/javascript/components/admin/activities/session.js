import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import pick from 'lodash/pick'
import { UPDATE_SESSION_MUTATION } from '../../../queries'
import CommonProps from '../../../lib/proptypes'
import { IconField } from '../../form'
import VenuePicker from './venue_picker'

const SessionSection = styled.section`
  padding: 1.5rem 0;
`

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
      <SessionSection>
        <IconField icon="venue" label="Venue">
          <VenuePicker value={session.venue} onChange={this.venueChanged} />
        </IconField>
      </SessionSection>
    )
  }
}

export default withApollo(Session)
