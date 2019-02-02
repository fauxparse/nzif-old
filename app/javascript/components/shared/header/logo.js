import React from 'react'
import PropTypes from 'prop-types'
import Link from './link'

const Logo = ({ root, year }) => (
  <Link to={root} className="header__logo">
    <span>NZIF {year}</span>
  </Link>
)

Logo.propTypes = {
  root: PropTypes.string,
  year: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
}

Logo.defaultProps = {
  root: '/',
}

export default Logo
