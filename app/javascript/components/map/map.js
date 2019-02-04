/* global google */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, withProps } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import uniqBy from 'lodash/uniqBy'
import throttle from 'lodash/throttle'
import CommonProps from '../../lib/common_props'
import styles from './styles.json'

const MAPS = 'https://maps.googleapis.com/maps/api/js'
const KEY = process.env.GOOGLE_MAPS_API_KEY
const BATS = { lat: -41.2935382, lng: 174.7845073 }

class Map extends Component {
  static propTypes = {
    venues: PropTypes.arrayOf(CommonProps.venue.isRequired),
    selection: CommonProps.venue,
    onVenueClick: PropTypes.func.isRequired
  }

  state = { mapLoaded: false }

  componentDidMount() {
    window.addEventListener('resize', this.recenterMap)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.recenterMap)
  }

  componentDidUpdate(prevProps) {
    const { selection } = this.props

    if (selection !== prevProps.selection) {
      this.recenterMap()
    }
  }

  loaded = () => {
    if (!this.state.mapLoaded) {
      this.setState({ mapLoaded: true })
      this.recenterMap()
    }
  }

  recenterMap = throttle(() => {
    if (this.state.mapLoaded) {
      const { selection } = this.props
      const point = selection ? { lat: selection.latitude, lng: selection.longitude } : BATS
      this.map.panTo(this.offsetCoordinates(point, this.centerOffset()))
    }
  }, 500)

  centerOffset() {
    if (window.innerWidth > 640) {
      return { x: 128, y: 0 }
    } else {
      return { x: 0, y: 112 }
    }
  }

  offsetCoordinates(latlng, offset) {
    const map = this.map
    const scale = Math.pow(2, map.getZoom())
    const projection = map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.getProjection()
    const worldCoordinateCenter = projection.fromLatLngToPoint(new google.maps.LatLng(latlng))
    const pixelOffset = new google.maps.Point(offset.x / scale || 0, offset.y / scale || 0)
    const worldCoordinateNewCenter = new google.maps.Point(
      worldCoordinateCenter.x - pixelOffset.x,
      worldCoordinateCenter.y + pixelOffset.y
    )
    return projection.fromPointToLatLng(worldCoordinateNewCenter)
  }

  render() {
    const { venues, onVenueClick } = this.props

    return (
      <GoogleMap
        ref={map => (this.map = map)}
        defaultZoom={16}
        defaultCenter={BATS}
        defaultOptions={{
          styles,
          disableDefaultUI: true
        }}
        onIdle={this.loaded}
      >
        {uniqBy(venues, ({ address }) => address).map(venue => (
          <Marker
            key={venue.id}
            position={{ lat: venue.latitude, lng: venue.longitude }}
            clickable={true}
            onClick={() => onVenueClick(venue)}
          />
        ))}
      </GoogleMap>
    )
  }
}

export default compose(
  withProps({
    googleMapURL: `${MAPS}?v=3.exp&libraries=geometry,drawing,places&key=${KEY}`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div className="venue-map" />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(Map)
