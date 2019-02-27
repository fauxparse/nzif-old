import React from 'react'
import PropTypes from 'prop-types'
import ReactRouterPropTypes from 'react-router-prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'react-router-dom'
import { CURRENT_USER_QUERY } from '../../../queries'
import Menu from '../menu'
import Flatten from '../../flatten'
import User from './user'
import LogOutLink from './log_out'

export const NOTIFICATION_SUBSCRIPTION = gql`
  subscription userNotifications($userId: ID!) {
    notification(userId: $userId) {
      message
    }
  }
`

class UserMenu extends React.Component {
  state = {
    notificationsCount: 0
  }

  componentDidMount() {
    const { user, data: { subscribeToMore } } = this.props
    const { notificationsCount, id: userId } = user

    const unsubscribe = subscribeToMore({
      document: NOTIFICATION_SUBSCRIPTION,
      variables: { userId },
      updateQuery: (previous, { subscriptionData }) => {
        if (subscriptionData.data) {
          const { notificationsCount = 0 } = this.state
          this.setState({ notificationsCount: notificationsCount + 1 })
        }

        return previous
      }
    })

    this.setState({ notificationsCount, unsubscribe })
  }

  componentWillUnmount() {
    const { unsubscribe } = this.state
    if (unsubscribe) {
      unsubscribe()
    }
  }

  render() {
    const { user, match } = this.props
    const { notificationsCount } = this.state
    const { year } = match.params
    const admin = /^\/admin/.test(match.url)

    return (
      <Menu
        component={Flatten}
        renderButton={({ ref, open, toggle }) => (
          <User
            ref={ref}
            user={user}
            notificationsCount={notificationsCount}
            open={open}
            onClick={toggle}
          >
            {user.name}
          </User>
        )}
        renderContent={({ ref, open }) => (
          <Menu.Content ref={ref} className="current-user__menu" aria-expanded={open || undefined}>
            {admin && <Menu.Item icon="home" text="Home" to={`/${year}`} />}
            {!admin && user.roles.indexOf('admin') > -1 && (
              <Menu.Item
                icon="admin"
                text="Festival admin"
                to={`/admin${year ? `/${year}` : ''}`}
              />
            )}
            <Menu.Item icon="user" text="Profile" to={`${match.url}/profile`} />
            <Menu.Separator />
            <LogOutLink />
          </Menu.Content>
        )}
      />
    )
  }
}

UserMenu.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    notificationsCount: PropTypes.number.isRequired
  }),
  data: PropTypes.shape({
    subscribeToMore: PropTypes.func.isRequired,
  }),
  match: ReactRouterPropTypes.match.isRequired,
}

export default withRouter(graphql(CURRENT_USER_QUERY)(UserMenu))
