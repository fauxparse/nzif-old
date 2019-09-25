import React from 'react'
import PropTypes from 'lib/proptypes'
import ReactRouterPropTypes from 'react-router-prop-types'
import { withRouter } from 'react-router-dom'
import Sidebar from 'organisms/sidebar'
import List from 'molecules/list'
import Divider from 'atoms/divider'

const AdminSidebar = ({ match, history, location, staticContext, festival, ...props }) => {
  const { year } = festival || {}

  return (
    <Sidebar {...props}>
      <List>
        <List.Link to={`/${year}`} icon="arrow-left" primary="Festival home" />
      </List>
      <Divider inset />
      <List>
        <List.Link to={match.url} icon="admin" primary="Dashboard" />
        <List.Link to={`${match.url}/registrations`} icon="registration" primary="Registrations" />
        <List.Link to={`${match.url}/payments`} icon="payment" primary="Payments" />
        <List.Link to={`${match.url}/activities`} icon="calendar" primary="Timetable" />
        <List.Link to={`${match.url}/venues`} icon="venue" primary="Venues" />
        <List.Link to={`${match.url}/people`} icon="users" primary="People" />
        <List.Link to={`${match.url}/pitches`} icon="pitch" primary="Pitches" />
        <List.Link to={`${match.url}/content`} icon="content" primary="Static content" />
        <List.Link to={`${match.url}/history`} icon="clock" primary="History" />
      </List>
    </Sidebar>
  )
}

AdminSidebar.propTypes = {
  open: PropTypes.bool,
  onClickOutside: PropTypes.func,
  festival: PropTypes.festival,
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  staticContext: PropTypes.shape({}),
}

AdminSidebar.defaultProps = {
  onClickOutside: undefined,
  festival: undefined,
  staticContext: {},
}

export default withRouter(AdminSidebar)
