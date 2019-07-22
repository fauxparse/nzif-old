import React, { useEffect, useState } from 'react'
import PropTypes from 'lib/proptypes'
import ReactRouterPropTypes from 'react-router-prop-types'
import { withRouter } from 'react-router-dom'

const DetectLocationChange = ({ location, onChange }) => {
  const [currentLocation, setCurrentLocation] = useState(location)

  useEffect(() => {
    const { key: oldKey } = currentLocation
    const { key: newKey } = location

    if (newKey !== oldKey) {
      setCurrentLocation(location)
      onChange(location)
    }
  }, [location, currentLocation, setCurrentLocation, onChange])

  return null
}

DetectLocationChange.propTypes = {
  location: ReactRouterPropTypes.location,
  onChange: PropTypes.func.isRequired,
}

export default withRouter(DetectLocationChange)
