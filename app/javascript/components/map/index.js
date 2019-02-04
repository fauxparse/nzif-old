import React from 'react'
import CommonProps from '../../lib/proptypes'
import Map from './map'

const MapSection = ({ className }) => (
  <section className={className}>
    <Map />
  </section>
)

MapSection.propTypes = {
  className: CommonProps.className,
}

export default MapSection
