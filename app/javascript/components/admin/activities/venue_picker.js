import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { Select } from '../../form'
import CommonProps from '../../../lib/common_props'
import { VENUES_QUERY } from '../../../queries'

const VenuePicker = ({ value, data: { venues = [] }, onChange }) => (
  <Select
    options={venues.map(venue => ({ label: venue.name, value: venue.id }))}
    value={value && value.id}
    onChange={({ value: id }) => onChange(id && venues.find(v => v.id === id))}
    placeholder="Select a venue…"
  />
)

VenuePicker.propTypes = {
  value: CommonProps.venue,
  data: PropTypes.shape({
    venues: PropTypes.arrayOf(CommonProps.venue.isRequired),
  }),
  onChange: PropTypes.func.isRequired,
}

export default graphql(VENUES_QUERY)(VenuePicker)
