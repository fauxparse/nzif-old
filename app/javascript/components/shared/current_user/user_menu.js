import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { sidePadding } from '../../../styles/full_width'
import { media } from '../../../styles'
import Menu from '../menu'
import User from './user'
import LogOutLink from './log_out'

const MenuContent = styled(Menu.Content)`
  ${media.medium`
    left: auto;
  `}

  ${media.large`
    right: ${sidePadding};
    margin-right: -1rem;
  `}
`

export const NOTIFICATION_SUBSCRIPTION = gql`
  subscription userNotifications {
    notification {
      message
    }
  }
`

class UserMenu extends React.Component {
  state = {
    notificationsCount: 0
  }

  componentDidMount() {
    const { notificationsCount } = this.props.user
    this.setState({ notificationsCount })

    this.props.subscribeToMore({
      document: NOTIFICATION_SUBSCRIPTION,
      updateQuery: (previous, { subscriptionData }) => {
        if (subscriptionData.data) {
          const { notificationsCount = 0 } = this.state
          this.setState({ notificationsCount: notificationsCount + 1 })
        }

        return previous
      }
    })
  }

  render() {
    const { user, match } = this.props
    const { notificationsCount } = this.state
    const { year } = match.params

    return (
      <Menu
        component={Fragment}
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
          <MenuContent ref={ref} aria-expanded={open}>
            <Menu.Item
              icon="admin"
              text="Festival admin"
              to={`/admin${year ? `/${year}` : ''}`}
            />
            <Menu.Item icon="user" text="Profile" to="/profile" />
            <Menu.Separator />
            <Menu.Item as={LogOutLink} icon="log-out" text="Log out" />
          </MenuContent>
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
  subscribeToMore: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      year: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
}

export default withRouter(UserMenu)
