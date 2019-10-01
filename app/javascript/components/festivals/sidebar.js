import React, { useContext, useMemo } from 'react'
import PropTypes from 'lib/proptypes'
import Sidebar from 'organisms/sidebar'
import List from 'molecules/list'
import Divider from 'atoms/divider'
import CurrentUserContext from 'contexts/current_user'

const FestivalSidebar = ({ festival, registration, ...props }) => {
  const user = useContext(CurrentUserContext)

  const isAdmin = useMemo(() => user && user.roles.includes('admin'), [user])

  const registered = Boolean(registration && registration.state === 'complete')

  const { state, year } = festival || {}

  return (
    <Sidebar {...props}>
      <List>
        <List.Link to={`/${year}`} icon="home" primary="Festival home" />
        {registered ? (
          <List.Link
            to={`/${year}/register/workshops`}
            icon="registration"
            primary="Your registration"
          />
        ) : (
          <List.Link to={`/${year}/register`} icon="registration" primary="Register now" />
        )}
        {user && user.presenter && (
          <List.Link to={`/${year}/teaching`} icon="workshop" primary="Your workshops" />
        )}
        {user && (state === 'pitching') && (
          <List.Link to={`/${year}/pitches`} icon="pitch" primary="Your pitches" />
        )}
        <List.Link to={`/${year}/calendar`} icon="calendar" primary="Calendar" />
        <Divider inset />
        <List.Link to={`/${year}/workshops`} icon="workshop" primary="Workshops" />
        <List.Link to={`/${year}/shows`} icon="show" primary="Shows" />
        <List.Link to={`/${year}/social-events`} icon="social-event" primary="Social Events" />
        <List.Link to={`/${year}/forums`} icon="forum" primary="Forums" />
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
          to={`/${year}/faq`}
          icon="help"
          primary="Frequently-asked questions"
        />
        <List.Link
          to={`/${year}/code-of-conduct`}
          icon="code-of-conduct"
          primary="Code of conduct"
        />
        <List.Link
          to={`/${year}/privacy`}
          icon="privacy"
          primary="Your privacy"
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
  registration: PropTypes.shape({
    state: PropTypes.string,
  }),
}

FestivalSidebar.defaultProps = {
  onClickOutside: undefined,
  festival: {
    year: new Date().getYear() + 1900,
  },
  registration: null,
}

export default FestivalSidebar
