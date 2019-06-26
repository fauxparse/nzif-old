/* global google */

import React, { Component } from 'react'
import PropTypes from 'lib/proptypes'
import { compose, withProps } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import uniqBy from 'lodash/uniqBy'
import throttle from 'lodash/throttle'
import styles from './styles.json'

const MAPS = 'https://maps.googleapis.com/maps/api/js'
const KEY = process.env.GOOGLE_MAPS_API_KEY
const BATS = { lat: -41.2935382, lng: 174.7845073 }

const MarkerIcon = {
  path: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM9,10a3,3 0 1,0 6,0a3,3 0 1,0 -6,0',
  fillColor: 'hsl(4, 85%, 57%)',
  fillOpacity: 0.875,
  scale: 1,
  strokeColor: 'hsl(4, 85%, 57%)',
  strokeWeight: 2,
}

class Map extends Component {
  static propTypes = {
    venues: PropTypes.arrayOf(PropTypes.venue.isRequired),
    selection: PropTypes.venue,
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
    const { venues, selection, onVenueClick } = this.props

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
            icon={{
              ...MarkerIcon,
              scale: selection && selection.address === venue.address ? 1.5 : 1,
              anchor: new google.maps.Point(12, 23)
            }}
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
