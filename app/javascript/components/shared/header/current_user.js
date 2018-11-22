import React, { Fragment, createRef } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import withCurrentUser from '../../../lib/with_current_user'
import UserLink, { StyledLink } from './current_user_link'
import UserMenu from './user_menu'
import Link from './link'
import { Link as RippleLink } from '../ripple'
import LogOutLink from './log_out'

export const NOTIFICATION_SUBSCRIPTION = gql`
  subscription userNotifications {
    notification {
      message
    }
  }
`

class CurrentUser extends React.Component {
  state = { menuOpen: false, notificationCount: 0 }

  menuRef = createRef()
  buttonRef = createRef()

  componentDidMount() {
    document.addEventListener('mousedown', this.closeMenu)
    document.addEventListener('touchstart', this.closeMenu)

    this.props.data.subscribeToMore({
      document: NOTIFICATION_SUBSCRIPTION,
      updateQuery: (previous, { subscriptionData }) => {
        if (subscriptionData.data) {
          const { notificationCount } = this.state
          this.setState({ notificationCount: notificationCount + 1 })
        }

        return previous
      },
    })
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.closeMenu)
    document.removeEventListener('touchstart', this.closeMenu)
  }

  closeMenu = e => {
    const menu = this.menuRef.current
    const button = this.buttonRef.current

    if (
      this.state.menuOpen &&
      ![menu, button].find(el => el && el.contains(e.target))
    ) {
      this.toggleMenu()
    }
  }

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  render() {
    const { menuOpen, notificationCount } = this.state
    const { currentUser, match, data, ...props } = this.props
    const { params: { year } } = match

    return currentUser ? (
      <Fragment>
        <UserLink
          {...props}
          user={currentUser}
          notificationCount={notificationCount}
          ref={this.buttonRef}
          aria-expanded={menuOpen}
          onClick={this.toggleMenu}
        />
        <UserMenu aria-expanded={menuOpen} ref={this.menuRef}>
          <Link to={`/admin${year ? `/${year}` : ''}`}>
            <Link.Icon name="admin" />
            <Link.Text>Festival admin</Link.Text>
          </Link>
          <Link to="/profile">
            <Link.Icon name="user" />
            <Link.Text>Profile</Link.Text>
          </Link>
          <UserMenu.Separator />
          <LogOutLink>
            <Link.Icon name="log-out" />
            <Link.Text>Log out</Link.Text>
          </LogOutLink>
        </UserMenu>
      </Fragment>
    ) : (
      <StyledLink as={RippleLink} to="/login" className={this.props.className}>
        <Link.Text>Log in</Link.Text>
      </StyledLink>
    )
  }
}

CurrentUser.propTypes = {
  match: PropTypes.shape({ url: PropTypes.string.isRequired }).isRequired,
}

export default withRouter(withCurrentUser(CurrentUser))
