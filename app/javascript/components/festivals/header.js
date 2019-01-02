import React from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import { withRouter } from 'react-router-dom'
import Header from '../shared/header'
import Menu from '../shared/menu'

const FestivalHeader = ({ match }) => (
  <Header>
    <Menu.Item icon="workshop" text="Workshops" to={`${match.url}/workshops`} />
    <Menu.Item icon="show" text="Shows" to={`${match.url}/shows`} />
  </Header>
)

FestivalHeader.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
}

export default withRouter(FestivalHeader)
