import React from 'react'
import { compose, withProps } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import styles from './styles.json'

const MAPS = 'https://maps.googleapis.com/maps/api/js'
const KEY = process.env.GOOGLE_MAPS_API_KEY

const Map = compose(
  withProps({
    googleMapURL: `${MAPS}?v=3.exp&libraries=geometry,drawing,places&key=${KEY}`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `calc(100vh - 3.5rem)` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(_props => (
  <GoogleMap
    defaultZoom={16}
    defaultCenter={{ lat: -41.2935382, lng: 174.7845073 }}
    defaultOptions={{
      styles,
      disableDefaultUI: true,
    }}
  >
    <Marker position={{ lat: -41.2935382, lng: 174.7845073 }} />
  </GoogleMap>
))

export default Map
