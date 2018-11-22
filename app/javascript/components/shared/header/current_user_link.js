import React from 'react'
import styled from 'styled-components'
import Link from './link'
import Ripple from '../ripple'
import Avatar from './avatar'
import Icon from '../../icons'
import { media } from '../../../styles'

const UserName = styled(Link.Text)``

const StyledRipple = styled(Ripple)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
`

export const StyledLink = styled.div`
  align-items: center;
  align-self: stretch;
  color: inherit;
  cursor: pointer;
  display: flex;
  flex: 0 0 auto;
  margin-right: -1em;
  order: 1;
  padding: 0 0.5em;
  position: relative;

  ${UserName},
  > svg {
    display: none;
  }

  ${media.medium`
    padding: 0 1em;

    > svg {
      display: initial;
      transition: ${({ theme }) => theme.transition('transform')};
      pointer-events: none;
      touch-action: none;
    }

    &[aria-expanded="true"] {
      > svg {
        transform: rotate(0.5turn);
      }
    }

    ${UserName} {
      display: initial;
      padding: 0 0.5em;
    }
  `}
`

const UserLink = React.forwardRef(({ user, notificationCount, ...props }, ref) => (
  <StyledLink ref={ref} {...props}>
    <StyledRipple />
    <Avatar user={user} notificationCount={notificationCount} />
    <UserName>{user.name}</UserName>
    <Icon name="chevron-down" />
  </StyledLink>
))

export default UserLink
