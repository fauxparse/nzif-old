import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import chroma from 'chroma-js'
import { transition } from '../../../styles'
import Icon, { ICONS } from '../../icons'
import { Link } from '../ripple'

export const StyledItem = styled.div`
  align-items: center;
  background-color: ${({ theme }) => chroma(theme.colors.hoverBackground).alpha(0).css()};
  color: inherit;
  cursor: pointer;
  display: flex;
  padding: 0.5em 1em;
  transition: ${transition('background-color')};

  :hover,
  :focus,
  :active {
    background: ${({ theme }) => theme.colors.hoverBackground};
  }
`

export const StyledText = styled.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const StyledIcon = styled(Icon)`
  flex: 0 0 auto;
  margin-right: 2rem;
`

const Item = ({ as: Component, icon, text, children, ...props }) => (
  <StyledItem as={Component} {...props}>
    {icon && <StyledIcon name={icon} />}
    {text && <StyledText>{text}</StyledText>}
    {children}
  </StyledItem>
)

Item.propTypes = {
  as: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.func.isRequired,
    PropTypes.symbol.isRequired,
  ]),
  icon: PropTypes.oneOf(ICONS),
}

Item.defaultProps = {
  as: Link,
  icon: null,
}

Item.Styled = StyledItem

export default Item
