import styled from 'styled-components'
import Menu from './menu'
import UserMenuLink from './link'
import { minFullWidth, sidePadding } from '../../../styles/full_width'

const UserMenu = styled(Menu)`
  @media (min-width: ${({ theme }) => theme.layout.medium}) {
    left: auto;
  }

  @media (min-width: ${minFullWidth}) {
    right: calc(${sidePadding} - ${({ theme }) => theme.layout.padding});
  }
`

export default UserMenu
