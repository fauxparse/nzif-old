import React from 'react'
import PropTypes from 'lib/proptypes'
import Loader from 'atoms/loader'
import Venue from './venue'

const VenueList = ({ loading, venues, selection, onVenueClick }) => (
  <aside className="venue-list">
    {loading ? (
      <Loader />
    ) : (
      <ul className="venue-list__venues">
        {venues.map(venue => (
          <Venue
            key={venue.id}
            id={venue.id}
            name={venue.name}
            address={venue.address}
            selected={selection ? selection.address === venue.address : false}
            onClick={() => onVenueClick(venue)}
          />
        ))}
      </ul>
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
