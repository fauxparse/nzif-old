import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import Menu from '../menu'
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
  state = {}

  componentDidMount() {
    this.props.data.subscribeToMore({
      document: NOTIFICATION_SUBSCRIPTION,
      updateQuery: (previous, { subscriptionData }) => {
        if (subscriptionData.data) {
          const { notificationsCount = 0 } = this.state
          this.setState({ notificationsCount: notificationsCount + 1 })
        }

        return previous
      },
    })
  }

  componentDidUpdate() {
    const { data } = this.props
    if (data && this.state.notificationsCount === undefined) {
      const { notificationsCount } = data.currentUser
      this.setState({ notificationsCount })
    }
  }

  render() {
    const { notificationsCount = 0 } = this.state
    const { currentUser, match, data, ...props } = this.props
    const { params: { year } } = match

    return currentUser ? (
      <Menu
        component={Fragment}
        renderButton={({ ref, open, toggle }) => (
          <UserLink
            {...props}
            user={currentUser}
            notificationCount={notificationsCount}
            ref={ref}
            aria-expanded={open}
            onClick={toggle}
          />
        )}
        renderContent={({ ref, open }) => (
          <UserMenu aria-expanded={open} ref={ref}>
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
        )}
      />
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
