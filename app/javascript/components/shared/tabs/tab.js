import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from '../ripple'

export const StyledTab = styled(Link)`${({ theme }) => css`
  padding: 0.5rem 1rem;
  margin-bottom: -1px;
  color: ${theme.colors.secondary};
  min-width: 1%;

  &.active {
    color: ${theme.colors.text};
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`}`

export const Tab = ({ children, ...props }) => (
  <StyledTab
    role="tab"
    replace
    exact
    {...props}
  >
    {children}
  </StyledTab>
)

export default Tab
