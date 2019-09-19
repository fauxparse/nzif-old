import React from 'react'
import PropTypes from 'lib/proptypes'
import List from 'molecules/list'
import Ripple from 'effects/ripple'

const Venue = ({ venue, onClick }) => (
  <List.Item
    className="venue"
    icon="venue"
    primary={venue.name}
    secondary={venue.address}
    onClick={() => onClick(venue)}
  >
    <Ripple />
  </List.Item>
)

Venue.propTypes = {
  venue: PropTypes.venue.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Venue