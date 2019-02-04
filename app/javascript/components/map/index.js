import React from 'react'
import CommonProps from '../../lib/common_props'
import VenueMap from './venue_map'

const MapSection = ({ className }) => (
  <section className={className}>
    <VenueMap />
  </section>
)

MapSection.propTypes = {
  className: CommonProps.className,
}

export default MapSection
