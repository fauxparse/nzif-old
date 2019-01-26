import React from 'react'
import { graphql } from 'react-apollo'
import { Select } from '../../form'
import { VENUES_QUERY } from '../../../queries'

const VenuePicker = ({ value, data: { venues = [] }, onChange }) => (
  <Select
    options={venues.map(venue => ({ label: venue.name, value: venue }))}
    value={value}
    onChange={onChange}
    placeholder="Select a venue…"
  />
)

export default graphql(VENUES_QUERY)(VenuePicker)
