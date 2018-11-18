import React, { Fragment, createRef } from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import UserMenu from './user_menu'
import Link from './link'
import Ripple, { Link as RippleLink } from '../ripple'
import Avatar from '../avatar'
import Icon from '../../icons'
import { slide } from '../../page_transition'
import LogOutLink from './log_out'

const CurrentUserName = styled(Link.Text)``

export const CurrentUserLink = styled(Link)`
  align-items: center;
  align-self: stretch;
  display: flex;
  cursor: pointer;

  ${CurrentUserName},
  > svg {
    display: none;
  }

  @media (min-width: ${({ theme }) => theme.layout.medium}) {
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
  }
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

class CurrentUser extends React.Component {
  state = { menuOpen: false }

  menuRef = createRef()
  buttonRef = createRef()

  componentDidMount() {
    document.addEventListener('mousedown', this.closeMenu)
    document.addEventListener('touchstart', this.closeMenu)
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
    const { menuOpen } = this.state

    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data: { currentUser } = {}, loading }) =>
          loading ? null : currentUser ? (
            <Fragment>
              <CurrentUserLink
                as={Ripple}
                ref={this.buttonRef}
                aria-expanded={menuOpen}
                {...this.props}
                onClick={this.toggleMenu}
              >
                <Avatar name={currentUser.name} />
                <CurrentUserName>{currentUser.name}</CurrentUserName>
                <Icon name="chevron-down" />
              </CurrentUserLink>
              <UserMenu aria-expanded={menuOpen} ref={this.menuRef}>
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
      </Query>
    )
  }
}

export default CurrentUser
