import React from 'react'
import PropTypes from 'prop-types'
import CommonProps from '../../lib/common_props'
import Loader from '../shared/loader'
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
  venues: PropTypes.arrayOf(CommonProps.venue.isRequired),
  selection: CommonProps.venue,
  onVenueClick: PropTypes.func.isRequired
}

export default VenueList
