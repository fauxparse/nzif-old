import React, { Fragment, createRef } from 'react'
import styled from 'styled-components'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import UserMenu from './user_menu'
import Link from './link'
import Ripple, { Link as RippleLink } from '../ripple'
import Avatar from '../avatar'
import Icon from '../../icons'
import { slide } from '../../page_transition'
import LogOutLink from './log_out'
import { media } from '../../../styles'

const CurrentUserName = styled(Link.Text)``

const CurrentUserAvatar = styled(Avatar).attrs(({ notifications }) => ({
  'data-notification-count': notifications,
}))``

export const CurrentUserLink = styled(Link)`
  align-items: center;
  align-self: stretch;
  display: flex;
  cursor: pointer;

  ${CurrentUserAvatar} {
    &::after {
      content: '';
      position: absolute;
      right: 0;
      bottom: 0;
      width: 0.625em;
      height: 0.625em;
      border-radius: 50%;
      background: ${({ theme }) => theme.colors.accent};
      box-shadow: 0 0 0 0.125em ${({ theme }) => theme.colors.background};
    }

    &[data-notification-count="0"]::after {
      display: none;
    }
  }

  ${CurrentUserName},
  > svg {
    display: none;
  }

  ${media.medium`
    > svg {
      display: initial;
      transition: ${({ theme }) => theme.transition('transform')};
    }

    &[aria-expanded="true"] {
      > svg {
        transform: rotate(0.5turn);
      }
    }

    ${CurrentUserName} {
      display: initial;
      padding: 0 0.5em;
    }
  `}
`

export const CURRENT_USER_QUERY = gql`
  {
    currentUser {
      id
      name
      email
    }
  }
`

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
    const { data: { currentUser } = {}, loading, ...props } = this.props

    return loading ? null : currentUser ? (
      <Fragment>
        <CurrentUserLink
          as={Ripple}
          ref={this.buttonRef}
          aria-expanded={menuOpen}
          {...props}
          onClick={this.toggleMenu}
        >
          <CurrentUserAvatar
            name={currentUser.name}
            notifications={notificationCount}
          />
          <CurrentUserName>{currentUser.name}</CurrentUserName>
          <Icon name="chevron-down" />
        </CurrentUserLink>
        <UserMenu aria-expanded={menuOpen} ref={this.menuRef}>
          <Link to="/admin">
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
      <CurrentUserLink
        as={RippleLink}
        to={{ pathname: '/login', state: { transition: slide } }}
        className={this.props.className}
      >
        <Link.Text>Log in</Link.Text>
      </CurrentUserLink>
    )
  }
}

export default graphql(CURRENT_USER_QUERY)(CurrentUser)
