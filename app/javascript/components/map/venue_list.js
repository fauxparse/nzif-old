import React from 'react'
import PropTypes from 'lib/proptypes'
import Loader from 'atoms/loader'
import List from 'molecules/list'
import Ripple from 'effects/ripple'

const VenueList = ({ loading, venues, selection, onVenueClick }) => (
  <aside className="venue-list">
    {loading ? (
      <Loader />
    ) : (
      <List className="venue-list__venues">
        {venues.map(venue => (
          <List.Item
            key={venue.id}
            data-id={venue.id}
            icon="venue"
            primary={venue.name}
            secondary={venue.address}
            aria-selected={(selection && selection.id === venue.id) || undefined}
            onClick={() => onVenueClick(venue)}
          >
            <Ripple />
          </List.Item>
        ))}
      </List>
    )}
  </aside>
)

VenueList.propTypes = {
  loading: PropTypes.bool.isRequired,
  venues: PropTypes.arrayOf(PropTypes.venue.isRequired),
  selection: PropTypes.venue,
  onVenueClick: PropTypes.func.isRequired
}

export default VenueList
