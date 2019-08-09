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
        <List.Link to={`${match.url}/activities`} icon="calendar" primary="Timetable" />
        <List.Link to={`${match.url}/pitches`} icon="pitch" primary="Pitches" />
        <List.Link to={`${match.url}/content`} icon="content" primary="Static content" />
      </List>
    </Sidebar>
  )
}

AdminSidebar.propTypes = {
  open: PropTypes.bool,
  onClickOutside: PropTypes.func,
  festival: PropTypes.shape({
    pitchesOpen: PropTypes.bool,
  }),
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  staticContext: PropTypes.shape({}),
}

AdminSidebar.defaultProps = {
  onClickOutside: undefined,
  festival: {
    pitchesOpen: false,
  },
  staticContext: {},
}

export default withRouter(AdminSidebar)
