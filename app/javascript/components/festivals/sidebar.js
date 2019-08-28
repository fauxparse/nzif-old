import React, { useContext, useMemo } from 'react'
import PropTypes from 'lib/proptypes'
import Sidebar from 'organisms/sidebar'
import List from 'molecules/list'
import Divider from 'atoms/divider'
import CurrentUserContext from 'contexts/current_user'

const FestivalSidebar = ({ festival, ...props }) => {
  const user = useContext(CurrentUserContext)

  const isAdmin = useMemo(() => user && user.roles.includes('admin'), [user])

  const { state, year } = festival || {}

  return (
    <Sidebar {...props}>
      <List>
        <List.Link to={`/${year}`} icon="home" primary="Festival home" />
        <List.Link to={`/${year}/register`} icon="registration" primary="Register now" />
        <List.Link to={`/${year}/workshops`} icon="workshop" primary="Workshops" />
        <List.Link to={`/${year}/shows`} icon="show" primary="Shows" />
        {user && (state === 'pitching') && (
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
        <List.Link to={`/${year}/map`} icon="venue" primary="Venue map" />
        <List.Link
          to={`/${year}/code-of-conduct`}
          icon="code-of-conduct"
          primary="Code of conduct"
        />
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
  festival: PropTypes.festival,
}

FestivalSidebar.defaultProps = {
  onClickOutside: undefined,
  festival: {
    year: new Date().getYear() + 1900,
  },
}

export default FestivalSidebar
