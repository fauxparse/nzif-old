import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import pick from 'lodash/pick'
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
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
  }

  state = {
    venue: this.props.session.venue,
  }

  render() {
    const { venue } = this.state

    return (
      <SessionSection>
        <IconField icon="venue" label="Venue">
          <VenuePicker value={this.state.venue} onChange={(venue) => this.setState({ venue })} />
        </IconField>
      </SessionSection>
    )
  }
}

export default Session
