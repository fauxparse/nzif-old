import React, { useEffect, useState } from 'react'
import PropTypes from 'lib/proptypes'
import { graphql } from 'react-apollo'
import { VENUES_QUERY } from 'queries'
import VenueList from './venue_list'
import Map from './map'

const VenueMap = ({ data: { loading, venues } }) => {
  const [selection, setSelection] = useState()

  const hash = location.hash.replace(/^#/, '')

  useEffect(() => {
    if (hash && venues) {
      setSelection(venues.find(v => v.id.toString() === hash))
    }
  }, [venues, hash, setSelection])

  return (
    <div className="venues-with-map">
      <VenueList
        loading={loading}
        venues={loading ? [] : venues}
        selection={selection}
      />
      <Map
        venues={loading ? [] : venues}
        selection={selection}
        onVenueClick={({ id }) => location.hash = id}
      />
    </div>
  )
}

VenueMap.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    venues: PropTypes.arrayOf(PropTypes.venue),
  }).isRequired,
}

export default graphql(VENUES_QUERY)(VenueMap)
