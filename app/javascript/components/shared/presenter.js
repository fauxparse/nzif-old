import React from 'react'
import PropTypes from 'prop-types'

const Presenter = ({ name, origin }) => (
  <span className="presenter-name">
    {name}
    {origin && <small className="presenter-name__origin"> ({origin})</small>}
  </span>
)

Presenter.propTypes = {
  name: PropTypes.string.isRequired,
  origin: PropTypes.string,
}

export default Presenter
