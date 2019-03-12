import React from 'react'
import { withRouter } from 'react-router-dom'
import Link from './link'

const Footer = ({ match, children }) => (
  <footer className="footer">
    <Link to={`${match.url}/workshops`} icon="workshop">Workshops</Link>
    <Link to={`${match.url}/shows`} icon="show">Shows</Link>
    <Link to={`${match.url}/map`} icon="venue">Map</Link>
    {children}
  </footer>
)

export default withRouter(Footer)
