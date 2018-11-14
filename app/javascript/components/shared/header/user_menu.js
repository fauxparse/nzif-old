import styled from 'styled-components'
import chroma from 'chroma-js'
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

UserMenu.Separator = styled.hr`
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-width: 1px 0 0;
  margin: 0;
`

export default UserMenu
