import styled from 'styled-components'
import { Link } from '../ripple'
import Icon from '../../icons'

const HeaderLink = styled(Link)`
  align-items: center;
  background-color: rgba(0, 0, 0, 0);
  border: 0;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  display: flex;
  min-width: 1px;
  opacity: 0.75;
  padding: 1em;
  position: relative;
  text-decoration: none;
  transition: ${({ theme }) => `${theme.transition('background-color')}, ${theme.transition('opacity')}`};
  user-select: none;

  &:hover,
  &:focus,
  &[aria-expanded="true"] {
    background-color: rgba(0, 0, 0, 0.375);
    outline: none;
  }

  &:hover,
  &:focus,
  &.active,
  &[aria-expanded="true"] {
    opacity: 1;
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
