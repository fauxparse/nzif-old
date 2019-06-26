import React from 'react'
import PropTypes from 'lib/proptypes'
import VenueMap from './venue_map'

const MapSection = ({ className }) => (
  <section className={className}>
    <VenueMap />
  </section>
)

MapSection.propTypes = {
  className: PropTypes.className,
}

export default MapSection
