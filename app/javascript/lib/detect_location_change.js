import React, { useEffect } from 'react'
import PropTypes from 'lib/proptypes'
import ReactRouterPropTypes from 'react-router-prop-types'
import { withRouter } from 'react-router-dom'

const DetectLocationChange = ({ location, onChange }) => {
  useEffect(() => {
    location && onChange(location)
  }, [location, onChange])
  return null
}

DetectLocationChange.propTypes = {
  location: ReactRouterPropTypes.location,
  onChange: PropTypes.func.isRequired,
}

export default withRouter(DetectLocationChange)
