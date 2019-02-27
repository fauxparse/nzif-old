import React from 'react'
import { withRouter } from 'react-router-dom'
import Header from '../shared/header'
import Menu from '../shared/menu'

const AdminHeader = ({ match }) => (
  <Header>
    <Menu.Item icon="show" text="Activities" to={`${match.url}/activities`} />
    <Menu.Item icon="user" text="People" to={`${match.url}/people`} />
  </Header>
)

export default withRouter(AdminHeader)
