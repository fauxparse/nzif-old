import React from 'react'
import PropTypes from 'lib/proptypes'

import './index.scss'

const Presenter = ({ name, origin }) => (
  <span className="presenter">
    <span className="presenter__name">{name}</span>
    {origin && <small className="presenter__origin"> ({origin})</small>}
  </span>
)

Presenter.propTypes = {
  name: PropTypes.string.isRequired,
  origin: PropTypes.string,
}

export default Presenter
