import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import HeaderContainer, { Link } from '../shared/header'

const Header = ({ match }) => (
  <HeaderContainer>
    <Link to={`${match.url}/workshops`}>
      <Link.Icon name="workshop" />
      <Link.Text>Workshops</Link.Text>
    </Link>
    <Link to={`${match.url}/shows`}>
      <Link.Icon name="show" />
      <Link.Text>Shows</Link.Text>
    </Link>
  </HeaderContainer>
)

Header.propTypes = {
  match: PropTypes.shape({ url: PropTypes.string.isRequired }).isRequired,
}

export default withRouter(Header)
