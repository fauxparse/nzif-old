import styled from 'styled-components'
import Menu from './menu'
import { sidePadding } from '../../../styles/full_width'
import { media } from '../../../styles'

const UserMenu = styled(Menu)`
  ${media.medium`
    left: auto;
  `}

  ${media.large`
    right: ${sidePadding};
    margin-right: -1rem;
  `}
`

UserMenu.Separator = styled.hr`
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-width: 1px 0 0;
  margin: 0;
`

export default UserMenu
