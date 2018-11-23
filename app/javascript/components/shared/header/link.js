import styled from 'styled-components'
import chroma from 'chroma-js'
import { Link } from '../ripple'
import Icon from '../../icons'

const HeaderLink = styled(Link)`
  align-items: center;
  background-color: ${({ theme }) => chroma(theme.colors.hoverBackground).alpha(0).css()};
  border: 0;
  color: ${props => props.theme.colors.foreground};
  cursor: pointer;
  display: flex;
  min-width: 1px;
  padding: 1em;
  position: relative;
  text-decoration: none;
  transition: ${({ theme }) => `${theme.transition('background-color')}, ${theme.transition('opacity')}`};
  user-select: none;

  &:hover,
  &:focus,
  &[aria-expanded="true"] {
    background-color: ${({ theme }) => theme.colors.hoverBackground};
    outline: none;
  }
`

HeaderLink.Text = styled.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

HeaderLink.Icon = styled(Icon)`
  flex: 0 0 auto;
  margin-right: 2rem;
`

export default HeaderLink
