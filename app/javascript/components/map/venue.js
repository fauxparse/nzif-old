import React from 'react'
import PropTypes from 'prop-types'
import CommonProps from '../../lib/common_props'
import Icon from '../icons'

const Venue = ({ id, name, address, selected, onClick }) => (
  <li
    className="venue venue-list__venue"
    aria-selected={selected || undefined}
    data-id={id}
    onClick={onClick}
  >
    <Icon name="venue" />
    <div className="venue__details">
      <span className="venue__name">{name}</span>
      <address className="venue__address">{address}</address>
    </div>
  </li>
)

Venue.propTypes = {
  id: CommonProps.id.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Venue
