import React from 'react'
import PropTypes from 'lib/proptypes'
import Icon from '../../atoms/icon'

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
  id: PropTypes.id.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Venue
