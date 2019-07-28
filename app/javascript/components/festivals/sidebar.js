import React, { Fragment, useContext, useMemo } from 'react'
import PropTypes from 'lib/proptypes'
import Sidebar from 'organisms/sidebar'
import List from 'molecules/list'
import Divider from 'atoms/divider'
import { CurrentUserContext } from '../shared/current_user/context'

const FestivalSidebar = ({ festival, ...props }) => {
  const user = useContext(CurrentUserContext)

  const isAdmin = useMemo(() => user && user.roles.includes('admin'), [user])

  const { pitchesOpen, programmeLaunched } = festival

  const { year } = festival || {}

  return (
    <Sidebar {...props}>
      <List>
        <List.Link to={`/${year}`} icon="home" primary="Festival home" />
        {programmeLaunched && (
          <Fragment>
            <List.Link to={`/${year}/workshops`} icon="workshop" primary="Workshops" />
            <List.Link to={`/${year}/shows`} icon="show" primary="Shows" />
          </Fragment>
        )}
        {user && pitchesOpen && (
          <List.Link to={`/${year}/pitches`} icon="pitch" primary="My pitches" />
        )}
      </List>
      {isAdmin && (
        <>
          <Divider inset />
          <List>
            <List.Link to={`/admin/${year}`} icon="admin" primary="Festival admin" />
          </List>
        </>
      )}
      <Divider inset />
      <List compact>
        <List.Link to="#" icon="venue" primary="Venue map" />
        <List.Link to="#" icon="code-of-conduct" primary="Code of conduct" />
        <List.Link
          as="a"
          href="https://improvfest.nz"
          target="_blank"
          rel="noopener noreferrer"
          icon="external-link"
          primary="Public website"
        />
      </List>
    </Sidebar>
  )
}

FestivalSidebar.propTypes = {
  open: PropTypes.bool,
  onClickOutside: PropTypes.func,
  festival: PropTypes.shape({
    pitchesOpen: PropTypes.bool,
    programmeLaunched: PropTypes.bool,
  }),
}

FestivalSidebar.defaultProps = {
  onClickOutside: undefined,
  festival: {
    pitchesOpen: false,
    programmeLaunched: false,
  },
}

export default FestivalSidebar
