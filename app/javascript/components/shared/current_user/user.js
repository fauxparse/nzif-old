import React from 'react'
import styled from 'styled-components'
import { media } from '../../../styles'
import Menu from '../menu'
import Avatar, { StyledAvatar } from './avatar'

const UserName = styled.span``

const MenuButton = styled(Menu.Button)`
  order: 1;
  margin-right: -1em;
  padding: 0.5em;

  ${UserName},
  ${Menu.Button.Chevron} {
    display: none;
  }

  ${media.medium`
    padding: 0.5em 1em;

    ${StyledAvatar} {
      margin-right: 1em;
    }

    ${UserName},
    ${Menu.Button.Chevron} {
      display: initial;
    }
  `}
`

const User = React.forwardRef(({ user, notificationsCount, ...props }, ref) => (
  <MenuButton ref={ref} {...props}>
    <Avatar user={user} notificationsCount={notificationsCount} />
    <UserName>{user.name}</UserName>
  </MenuButton>
))

export default User
