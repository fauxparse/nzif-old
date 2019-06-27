import React from 'react'
import PropTypes from 'lib/proptypes'
import ReactRouterPropTypes from 'react-router-prop-types'
import { withRouter } from 'react-router-dom'
import Loader from 'atoms/loader'
import List from 'molecules/list'

const VenueList = ({ loading, venues, selection }) => (
  <aside className="venue-list">
    {loading ? (
      <Loader />
    ) : (
      <List className="venue-list__venues">
        {venues.map(venue => (
          <List.Link
            key={venue.id}
            to={`#${venue.id}`}
            data-id={venue.id}
            icon="venue"
            primary={venue.name}
            secondary={venue.address}
            active={(selection && selection.id === venue.id) || undefined}
          />
        ))}
      </List>
    )}
  </aside>
)

VenueList.propTypes = {
  loading: PropTypes.bool.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  venues: PropTypes.arrayOf(PropTypes.venue.isRequired),
  selection: PropTypes.venue,
}

export default withRouter(VenueList)
